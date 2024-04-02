const userCardPlaceholder = document.getElementById("user-card-placeholder");
const btn = document.getElementById("btn");
const urlUserPlaceholder = "https://jsonplaceholder.typicode.com/users";
let startIndex = 0;
let endIndex = 2;
let userDataArr = [];

const fetchData = async () => {
    try {
        const res = await fetch(urlUserPlaceholder);
        userDataArr = await res.json();
        renderCard(userDataArr.slice(startIndex, endIndex));
    } catch (error) {
        console.error('Some problems:', error);
        userCardPlaceholder.innerHTML = `
            <h2>Some problems. ${error}</h2>
        `;
    }
}

const fetchMoreUser = () => {
    startIndex += 2;
    endIndex += 2;
    if (endIndex === userDataArr.length) {
        btn.style.display = "none";
    }

    renderCard(userDataArr.slice(startIndex, endIndex));
}

const renderCard = (users) => {
    users.forEach(({ name, username, email, phone, website }) => {
        userCardPlaceholder.innerHTML += `
        <div class="user-card">
        <h3>${name}</h3>
        <h4>${username}</h4>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>WebSite: <a href="${website}">${website}</a></p>
        </div>
        `
    });
}
fetchData()
btn.addEventListener("click", fetchMoreUser)