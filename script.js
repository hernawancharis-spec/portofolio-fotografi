/**
 * KONFIGURASI DATA FOTO
 * Sesuaikan kategori dengan tombol di sidebar index.html
 */
const photos = [
    { url: 'images/image1.jpeg.jpg', title: 'Photography Work 1', category: 'events' },
    { url: 'images/image2.jpeg.jpg', title: 'Photography Work 2', category: 'school' },
    { url: 'images/image3.jpeg.jpg', title: 'Photography Work 3', category: 'street' },
    { url: 'images/image4.jpeg.jpg', title: 'Photography Work 4', category: 'street' },
    { url: 'images/image5.jpeg.jpg', title: 'Photography Work 5', category: 'street' }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Elemen
    const gallery = document.getElementById('photo-gallery');
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById('img-full');
    const closeBtn = document.querySelector('.close');
    
    // Elemen Sidebar (Penting untuk Garis 3)
    const filterSidebar = document.getElementById('filterSidebar');
    const filterOpen = document.getElementById('filterOpen'); // Tombol Garis 3
    const filterClose = document.getElementById('filterClose'); // Tombol X di sidebar

    /**
     * 2. FUNGSI RENDER GALERI
     */
    function initGallery() {
        if (!gallery) return;
        gallery.innerHTML = '';

        photos.forEach(photo => {
            const item = document.createElement('div');
            // Menambahkan kategori sebagai class untuk filtering
            item.classList.add('photo-item', 'reveal', photo.category);
            
            item.innerHTML = `
                <img src="${photo.url}" alt="${photo.title}" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/500?text=Image+Not+Found'">
            `;
            
            item.onclick = () => {
                modal.style.display = "flex";
                modalImg.src = photo.url;
                document.body.style.overflow = "hidden"; // Stop scroll saat zoom
            };
            
            gallery.appendChild(item);
        });
    }

    /**
     * 3. LOGIKA SIDEBAR (FIXED)
     */
    document.addEventListener('click', (e) => {
        // Mencari apakah yang diklik adalah filterOpen atau elemen di dalamnya
        if (e.target.closest('#filterOpen')) {
            filterSidebar.classList.add('active');
        }
        
        // Mencari apakah yang diklik adalah tombol tutup
        if (e.target.closest('#filterClose')) {
            filterSidebar.classList.remove('active');
        }
    });

    /**
     * 4. LOGIKA FILTER + AUTO SCROLL
     */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gallerySection = document.getElementById('galeri'); // Ambil elemen galeri

    filterButtons.forEach(btn => {
        btn.onclick = () => {
            // 1. Ubah tombol aktif
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            // 2. Filter Foto
            const filterValue = btn.getAttribute('data-filter');
            const items = document.querySelectorAll('.photo-item');

            items.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // 3. Tutup sidebar
            filterSidebar.classList.remove('active');

            // 4. LOGIKA SCROLL KE GALERI
            // Memberi sedikit jeda agar transisi sidebar selesai dulu baru scroll
            setTimeout(() => {
                gallerySection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 300); 
        };
    });

    /**
     * 5. KONTROL LIGHTBOX
     */
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // Jalankan Galeri & Animasi
    initGallery();
    
    // Animasi muncul saat scroll (Reveal)
    const revealOnScroll = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            const triggerBottom = window.innerHeight * 0.85;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) el.classList.add('active');
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Jalankan sekali saat start
});