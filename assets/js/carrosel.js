// Responsividade do glide.js
const config = {
    type: "carousel",
    perView: 4,
    breakpoints: {
        1400: {
            perView: 3
        },
        1024: {
            perView: 2
        },
        600: {
            perView: 1
        }
    }
}
new Glide('.glide', config).mount();