/**
 * KONFIGURASI DATA FOTO
 * Sesuai dengan folder 'images' yang Anda buat
 */
const photos = [
    { url: 'images/image1.jpeg.jpg', title: 'Photography Work 1' },
    { url: 'images/image2.jpeg.jpg', title: 'Photography Work 2' },
    { url: 'images/image3.jpeg.jpg', title: 'Photography Work 3' },
    { url: 'images/image4.jpeg.jpg', title: 'Photography Work 4' },
    { url: 'images/image5.jpeg.jpg', title: 'Photography Work 5' }
];

// Inisialisasi Elemen DOM
const gallery = document.getElementById('photo-gallery');
const modal = document.getElementById('lightbox');
const modalImg = document.getElementById('img-full');
const closeBtn = document.querySelector('.close');

/**
 * 1. FUNGSI RENDER GALERI
 * Memasukkan foto ke dalam HTML secara dinamis
 */
function initGallery() {
    if (!gallery) return;

    photos.forEach(photo => {
        const item = document.createElement('div');
        item.classList.add('photo-item', 'reveal'); // 'reveal' untuk efek animasi scroll
        
        // Menambahkan gambar dengan penanganan jika file tidak ditemukan
        item.innerHTML = `
            <img src="${photo.url}" 
                 alt="${photo.title}" 
                 loading="lazy" 
                 onerror="this.src='https://via.placeholder.com/800x1000?text=File+Not+Found'">
        `;
        
        // Event klik untuk membuka Lightbox
        item.onclick = () => {
            modal.style.display = "flex";
            modalImg.src = photo.url;
            document.body.style.overflow = "hidden"; // Matikan scroll saat foto diperbesar
        };
        
        gallery.appendChild(item);
    });
}

/**
 * 2. KONTROL LIGHTBOX (TUTUP MODAL)
 */
if (closeBtn) {
    closeBtn.onclick = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };
}

// Tutup modal jika area hitam di luar foto diklik
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

/**
 * 3. ANIMASI REVEAL SAAT SCROLL
 * Membuat elemen muncul perlahan saat di-scroll
 */
const revealOnScroll = () => {
    const items = document.querySelectorAll('.reveal');
    items.forEach(el => {
        const triggerBottom = window.innerHeight * 0.85; // Elemen muncul saat mencapai 85% layar
        const elementTop = el.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};

/**
 * 4. SMOOTH SCROLL UNTUK NAVIGASI
 * Berfungsi untuk menu Home, Portofolio, dan Kontak (@charizputr4)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Memberi sedikit jarak (offset) agar tidak terpotong navbar fixed
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetElement.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * 5. INISIALISASI SAAT HALAMAN DIMUAT
 */
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    revealOnScroll(); // Jalankan sekali saat load untuk foto yang sudah terlihat
});

// Jalankan animasi reveal setiap kali user scroll
window.addEventListener('scroll', revealOnScroll);