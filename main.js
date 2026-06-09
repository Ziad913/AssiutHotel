let users = JSON.parse(localStorage.getItem("users")) || {};

function togglePass(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

function signup() {
  const pass = document.getElementById("pass").value;
  const email = document.getElementById("email").value;
  const confirm = document.getElementById("confirm").value;
  const hint = document.getElementById("hint");

  if (pass !== confirm) {
    hint.innerText = "Passwords don't match";
    hint.style.color = "red";
    return;
  }

  if (pass.length < 6) {
    hint.innerText = "Password must be at least 6 characters";
    hint.style.color = "red";
    return;
  }

  users[email] = pass;
  localStorage.setItem("users", JSON.stringify(users));

  hint.innerText = "Account created successfully!";
  hint.style.color = "#2ecc71";

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
}

function checkInUsers() {
  const emailUser = document.getElementById("eChek").value;
  const passUser = document.getElementById("passChek").value;
  const hint = document.getElementById("hint");

  users = JSON.parse(localStorage.getItem("users")) || {};
  if (!users[emailUser]) {
    hint.innerText = "This Email Is Not Avalable";
    hint.style.color = "red";
    return;
  }

  if (users[emailUser] !== passUser) {
    hint.innerText = "The Password Is Wrong";
    hint.style.color = "red";
    return;
  }

  hint.innerText = "Account successfully!";
  hint.style.color = "#2ecc71";

  setTimeout(() => {
    window.location.href = "./page/home.html";
  }, 1000);
}

// booking
const modal = document.getElementById("bookingPage");
const closeBtn = document.querySelector(".close-btn");
const bookingBtns = document.querySelectorAll(".btn-primary");
const roomVideo = document.getElementById("roomVideo"); // 🎥 مسكنا عنصر الفيديو الجديد

// فتح المودل وتشغيل الفيديو
bookingBtns.forEach((btn) => {
  btn.onclick = function (e) {
    e.preventDefault();
    modal.style.display = "block";

    // تشغيل الفيديو تلقائياً
    if (roomVideo) {
      roomVideo.currentTime = 0;
      roomVideo.play().catch((error) => {
        console.log(
          "التشغيل التلقائي محجوب حتى يتفاعل المستخدم مع الصفحة أولاً.",
        );
      });
    }
  };
});

// إغلاق المودل وإيقاف الفيديو
closeBtn.onclick = function () {
  modal.style.display = "none";
  if (roomVideo) {
    roomVideo.pause();
  }
};

// إغلاق المودل وإيقاف الفيديو
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    if (roomVideo) {
      roomVideo.pause();
    }
  }
};

document.getElementById("bookingForm").onsubmit = function (e) {
  e.preventDefault();
  alert("تم إرسال طلب حجزك لـ AssiutHotel بنجاح!");
  modal.style.display = "none";

  if (roomVideo) {
    roomVideo.pause();
  }
  this.reset();
};
