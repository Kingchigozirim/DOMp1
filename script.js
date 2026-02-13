// js/script.js

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // ───────────────────────────────────────────────
    //  SELECT ALL IMPORTANT ELEMENTS
    // ───────────────────────────────────────────────

    const products = document.querySelectorAll(".card");           // each product card
    const totalElement = document.querySelector(".total");         // <span class="total">
    const plusButtons  = document.querySelectorAll(".fa-plus-circle");
    const minusButtons = document.querySelectorAll(".fa-minus-circle");
    const trashButtons = document.querySelectorAll(".fa-trash-alt");
    const heartButtons = document.querySelectorAll(".fa-heart");

    // ───────────────────────────────────────────────
    //  HELPER FUNCTIONS
    // ───────────────────────────────────────────────

    function getUnitPrice(card) {
        // Get the text like "100 $" → convert to number 100
        const priceText = card.querySelector(".unit-price").textContent;
        return parseFloat(priceText) || 0;
    }

    function getQuantity(card) {
        return parseInt(card.querySelector(".quantity").textContent) || 0;
    }

    function setQuantity(card, newValue) {
        const qtyEl = card.querySelector(".quantity");
        qtyEl.textContent = Math.max(0, newValue); // never go below 0
    }

    function calculateTotal() {
        let sum = 0;

        products.forEach(card => {
            // Skip if card was deleted (no longer in DOM)
            if (!document.body.contains(card)) return;

            const price = getUnitPrice(card);
            const qty   = getQuantity(card);
            sum += price * qty;
        });

        totalElement.textContent = sum + " $";
    }

    function updateTotalAfterChange() {
        calculateTotal();
    }

    // ───────────────────────────────────────────────
    //  PLUS / MINUS QUANTITY
    // ───────────────────────────────────────────────

    plusButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card");
            let qty = getQuantity(card);
            setQuantity(card, qty + 1);
            updateTotalAfterChange();
        });
    });

    minusButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card");
            let qty = getQuantity(card);
            if (qty > 0) {
                setQuantity(card, qty - 1);
                updateTotalAfterChange();
            }
        });
    });

    // ───────────────────────────────────────────────
    //  DELETE ITEM
    // ───────────────────────────────────────────────

    trashButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card");
            if (card) {
                // Remove the entire card from DOM
                card.parentElement.remove(); // removes the .card-body wrapper
                updateTotalAfterChange();
            }
        });
    });

    // ───────────────────────────────────────────────
    //  LIKE / UNLIKE (heart)
    // ───────────────────────────────────────────────

    heartButtons.forEach(heart => {
        heart.addEventListener("click", () => {
            // Toggle between black and red
            if (heart.style.color === "red") {
                heart.style.color = "black";
            } else {
                heart.style.color = "red";
            }
        });
    });

    // ───────────────────────────────────────────────
    //  INITIAL CALCULATION (in case some quantities ≠ 0)
    // ───────────────────────────────────────────────

    calculateTotal();

});