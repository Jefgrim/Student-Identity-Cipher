// Caesar cipher shift function
function caesarShift(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        let code;
        // Uppercase letters
        if (c >= 'A' && c <= 'Z') {
            code = c.charCodeAt(0) - 65;      // 'A' → 0
            code = (code + shift + 26) % 26;  // shift and wrap around
            result += String.fromCharCode(code + 65);
        }
        // Lowercase letters
        else if (c >= 'a' && c <= 'z') {
            code = c.charCodeAt(0) - 97;      // 'a' → 0
            code = (code + shift + 26) % 26;  // shift and wrap around
            result += String.fromCharCode(code + 97);
        }
        // Numbers, symbols, spaces remain unchanged
        else {
            result += c;
        }
    }
    return result;
}

// Encryption
function encryptText() {
    const name = document.getElementById("fullName").value.trim();
    const year = document.getElementById("yearLevel").value.trim();
    const course = document.getElementById("course").value.trim();
    const key = parseInt(document.getElementById("encryptKey").value);

    // Validation
    if (!name || !year || !course || isNaN(key)) {
        showAlert("Please fill all fields and enter a valid key.", "error");
        return;
    }
    if (key < 1 || key > 25) {
        showAlert("Key must be between 1 and 25.", "error");
        return;
    }
    if (year < 1 || year > 5){
        showAlert("Year must be between 1 and 5.", "error");
        return;
    }

    const plaintext = `${name} | ${year} Year | ${course}`;
    const ciphertext = caesarShift(plaintext, key);

    document.getElementById("plaintext").textContent = plaintext;
    document.getElementById("ciphertext").textContent = ciphertext;

    showAlert("Encryption successful!", "success");
}

// Decryption
function decryptText() {
    const ciphertext = document.getElementById("decryptInput").value.trim();
    const key = parseInt(document.getElementById("decryptKey").value);

    if (!ciphertext || isNaN(key)) {
        showAlert("Please enter ciphertext and a valid key. To Decrypt", "error");
        return;
    }
    if (key < 1 || key > 25) {
        showAlert("Key must be between 1 and 25.", "error");
        return;
    }

    const decrypted = caesarShift(ciphertext, -key);
    document.getElementById("decryptedResult").textContent = decrypted;

    showAlert("Decryption successful!", "success");
}


// Show a custom alert message
function showAlert(message, type="error") {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = message;

    // Change color based on type
    if(type === "error") {
        alertBox.style.backgroundColor = "#e74c3c"; // red
    } else if(type === "success") {
        alertBox.style.backgroundColor = "#2ecc71"; // green
    }

    alertBox.classList.remove("hide");
    alertBox.classList.add("show");

    // Auto-hide after 3 seconds
    setTimeout(() => {
        alertBox.classList.remove("show");
        alertBox.classList.add("hide");
    }, 3000);
}