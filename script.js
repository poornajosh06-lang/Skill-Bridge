// ==========================================
//          SKILLBRIDGE PROJECT
// ==========================================


// 1. SAMPLE PROJECTS

const sampleProjects = [

    {
        title: "Short Film Production",
        description: "Create a short film with a creative team. Looking for actors, editors and directors.",
        skills: "Acting, Video Editing, Direction",
        category: "Free Collaboration",
        location: "Hyderabad"
    },

    {
        title: "Website Development",
        description: "Develop a modern and responsive website for a growing business.",
        skills: "HTML, CSS, JavaScript",
        category: "Paid Work & Employment",
        location: "Remote"
    },

    {
        title: "College Innovation Project",
        description: "Build an innovative college project and collaborate with talented students.",
        skills: "Python, Research, Design",
        category: "Free Collaboration",
        location: "Khammam"
    },

    {
        title: "Animation & VFX Studio",
        description: "Work together on an animation project with creative artists and designers.",
        skills: "Blender, Animation, VFX",
        category: "Free Collaboration",
        location: "Remote"
    },

    {
        title: "Startup Business Development",
        description: "Join a startup team and help develop business strategies and growth ideas.",
        skills: "Marketing, Business, Communication",
        category: "Paid Work & Employment",
        location: "Hyderabad"
    },

    {
        title: "College Event Management",
        description: "Create a team to plan and organize an exciting college cultural event.",
        skills: "Event Planning, Management, Designing",
        category: "Free Collaboration",
        location: "Warangal"
    },

    {
        title: "Construction Planning Project",
        description: "Collaborate on construction planning and design with skilled professionals.",
        skills: "Civil Engineering, AutoCAD, Planning",
        category: "Paid Work & Employment",
        location: "Remote"
    }

];


// 2. LOAD SAVED PROJECTS

let savedProjects = JSON.parse(
    localStorage.getItem("skillbridgeProjects")
) || [];


// Avoid duplicate sample projects

let projects = [

    ...sampleProjects,

    ...savedProjects.filter(saved =>
        !sampleProjects.some(sample =>
            sample.title === saved.title
        )
    )

];


// 3. DISPLAY PROJECTS

function displayProjects() {

    const projectList = document.getElementById("projectList");

    projectList.innerHTML = "";

    const searchText = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const filteredProjects = projects.filter(project => {

        const matchesCategory =
            currentFilter === "All" ||
            project.category === currentFilter;

        const matchesSearch =
            project.title.toLowerCase().includes(searchText) ||
            project.skills.toLowerCase().includes(searchText) ||
            project.description.toLowerCase().includes(searchText) ||
            project.location.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;

    });


    if (filteredProjects.length === 0) {

        projectList.innerHTML =
            "<p>No projects found. Try another search.</p>";

        return;

    }


    // Maximum 7 projects displayed

    filteredProjects.slice(0, 7).forEach(project => {

        const card = document.createElement("div");

        card.className = "project-card";


        const title = document.createElement("h3");
        title.textContent = project.title;


        const type = document.createElement("span");
        type.className = "project-type";
        type.textContent = project.category;


        const description = document.createElement("p");
        description.textContent = project.description;


        const skills = document.createElement("p");
        skills.textContent = "Skills: " + project.skills;


        const location = document.createElement("p");
        location.textContent = "Location: " + project.location;


        const button = document.createElement("button");

        button.className = "apply-button";

        button.textContent = "Request to Join";


        button.addEventListener("click", function () {

            requestToJoin(project.title);

        });


        card.appendChild(title);

        card.appendChild(type);

        card.appendChild(description);

        card.appendChild(skills);

        card.appendChild(location);

        card.appendChild(button);


        projectList.appendChild(card);

    });

}


// 4. PROJECT FILTER

let currentFilter = "All";


function filterProjects(category) {

    currentFilter = category;

    displayProjects();

}


// 5. PROJECT SEARCH

document
    .getElementById("searchInput")
    .addEventListener("input", displayProjects);


// 6. POST NEW PROJECT

document
    .getElementById("projectForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const newProject = {

            title: document.getElementById("projectTitle").value,

            description: document.getElementById("projectDescription").value,

            skills: document.getElementById("projectSkills").value,

            category: document.getElementById("projectCategory").value,

            location: document.getElementById("projectLocation").value

        };


        projects.unshift(newProject);


        // Save projects in browser

        localStorage.setItem(
            "skillbridgeProjects",
            JSON.stringify(projects.filter(project =>
                !sampleProjects.some(sample =>
                    sample.title === project.title
                )
            ))
        );


        displayProjects();


        document.getElementById("projectForm").reset();


        document.getElementById("formMessage").textContent =
            "Your project has been published successfully!";

    });


// 7. REQUEST TO JOIN

function requestToJoin(projectTitle) {

    const name = localStorage.getItem("skillbridgeUserName");


    if (!name) {

        alert("Please create your profile before requesting to join.");

        document.getElementById("profile").scrollIntoView();

        return;

    }


    let requests = JSON.parse(
        localStorage.getItem("skillbridgeRequests")
    ) || [];


    requests.push({

        name: name,

        project: projectTitle,

        date: new Date().toLocaleString()

    });


    localStorage.setItem(
        "skillbridgeRequests",
        JSON.stringify(requests)
    );


    alert("Your request to join has been recorded successfully!");

}


// 8. SAVE USER PROFILE

document
    .getElementById("profileForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const name = document.getElementById("userName").value;

        const skills = document.getElementById("userSkills").value;

        const interests = document.getElementById("userInterests").value;


        const user = {

            name: name,

            skills: skills,

            interests: interests

        };


        localStorage.setItem(
            "skillbridgeUser",
            JSON.stringify(user)
        );


        localStorage.setItem(
            "skillbridgeUserName",
            name
        );


        document.getElementById("profileMessage").textContent =
            "Profile saved successfully!";


        showProfile();

    });


// 9. DISPLAY USER PROFILE

function showProfile() {

    const savedUser = JSON.parse(
        localStorage.getItem("skillbridgeUser")
    );


    if (!savedUser) {

        document.getElementById("profile").scrollIntoView();

        alert("Please create your profile first.");

        return;

    }


    const details = document.getElementById("profileDetails");


    details.textContent =
        "Name: " + savedUser.name +
        " | Skills: " + savedUser.skills +
        " | Interests: " + savedUser.interests;


    document.getElementById("profile").scrollIntoView();

}


// 10. INITIALIZE WEBSITE

displayProjects();
