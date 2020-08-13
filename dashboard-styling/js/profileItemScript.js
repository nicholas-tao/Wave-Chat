//function which runs when DOM is ready i.e. upon page start - populates the faculty dropdown list
$(document).ready(populateDropdowns());

//create arrays holding each university's programs
let waterlooPrograms = [
  "Accounting and Financial Management",
  "Actuarial Science",
  "Anthropology",
  "Applied Mathematics",
  "Architectural Engineering",
  "Architecture",
  "Bachelor of Arts",
  "Bachelor of Science",
  "Biochemistry",
  "Biology",
  "Biomedical Engineering",
  "Biomedical Sciences",
  "Biostatistics",
  "Biotechnology/Chartered Professional Accountancy",
  "Business Administration and Computer Science",
  "Business Administration and Mathematics",
  "Business programs",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Classical Studies",
  "Combinatorics and Optimization",
  "Communication Studies",
  "Computational Mathematics",
  "Computer Engineering",
  "Computer Science",
  "Computing and Financial Management",
  "Data Science",
  "Earth Sciences",
  "Economics",
  "Education",
  "Electrical Engineering",
  "English",
  "Environment and Business",
  "Environment, Resources and Sustainability",
  "Environmental Engineering",
  "Environmental Science",
  "Fine Arts",
  "French",
  "Gender and Social Justice",
  "Geography and Aviation",
  "Geography and Environmental Management",
  "Geological Engineering",
  "Geomatics",
  "German",
  "Global Business and Digital Arts",
  "Health Studies",
  "History",
  "Honours Arts",
  "Honours Arts and Business",
  "Honours Science",
  "Information Technology Management",
  "International Development",
  "Kinesiology",
  "Knowledge Integration",
  "Legal Studies",
  "Liberal Studies",
  "Life Physics",
  "Life Sciences",
  "Management Engineering",
  "Materials and Nanosciences",
  "Mathematical Economics",
  "Mathematical Finance",
  "Mathematical Optimization",
  "Mathematical Physics",
  "Mathematics",
  "Mathematics/Business Administration",
  "Mathematics/Chartered Professional Accountancy",
  "Mathematics/Financial Analysis and Risk Management",
  "Mathematics/Teaching",
  "Mechanical Engineering",
  "Mechatronics Engineering",
  "Medicinal Chemistry",
  "Medieval Studies",
  "Minors and specializations",
  "Music",
  "Nanotechnology Engineering",
  "Nursing",
  "Optometry",
  "Pathways to medical school and other health professions",
  "Peace and Conflict Studies",
  "Pharmacy",
  "Philosophy",
  "Physical Sciences",
  "Physics",
  "Physics and Astronomy",
  "Planning",
  "Political Science",
  "Pre-law",
  "Psychology",
  "Public Health",
  "Pure Mathematics",
  "Recreation and Leisure Studies",
  "Recreation and Sport Business",
  "Religious Studies",
  "Science and Aviation",
  "Science and Business",
  "Sexuality, Marriage, and Family Studies",
  "Social Development Studies",
  "Social Work",
  "Sociology",
  "Software Engineering",
  "Spanish",
  "Statistics",
  "Systems Design Engineering",
  "Teaching",
  "Theatre and Performance",
  "Therapeutic Recreation",
  "Tourism Development",
];

let ottawaPrograms = [
  "Accounting",
  "Acting",
  "Anthropology",
  "Anthropology and Sociology",
  "Art History",
  "Biochemistry",
  "Biochemistry and Chemical Engineering",
  "Biology",
  "Biomedical Mechanical Engineering",
  "Biomedical Mechanical Engineering and Computing Technology",
  "Biomedical Science",
  "Biopharmaceutical Science",
  "Business Technology Management",
  "Chemical Engineering",
  "Chemical Engineering and Computing Technology",
  "Chemistry",
  "Civil Engineering",
  "Civil Engineering and Computing Technology",
  "Commerce & Juris Doctor",
  "Commerce and Juris Doctor",
  "Communication",
  "Communication & Political Science",
  "Communication & Sociology",
  "Communication and Political Science",
  "Communication and Sociology",
  "Communication et lettres françaises",
  "Computer Engineering",
  "Computer Science",
  "Computer Science and Mathematics",
  "Conflict Studies and Human Rights",
  "Criminology",
  "Criminology and Feminist and Gender Studies",
  "Data Science",
  "Digital Journalism",
  "Economics",
  "Economics and Political Science",
  "Economics and Public Policy",
  "Electrical Engineering",
  "Electrical Engineering and Computing Technology",
  "English",
  "English as a Second Language",
  "Environmental Economics and Public Policy",
  "Environmental Geoscience",
  "Environmental Science",
  "Environmental Studies",
  "Ethics and Political Philosophy",
  "Feminist and Gender Studies",
  "Feminist and Gender Studies and Political Science",
  "Feminist and Gender Studies and Sociology",
  "Finance",
  "Financial Mathematics and Economics",
  "Food and Nutrition Sciences",
  "French as a Second Language",
  "Geography",
  "Geology",
  "Geology-Physics",
  "Greek and Roman Studies",
  "Health Sciences",
  "Healthcare Analytics",
  "History",
  "History and Political Science",
  "Human Kinetics",
  "Human Resource Management",
  "Indigenous Studies",
  "Integrated Food Sciences",
  "Interdisciplinary Studies",
  "International Development & Globalization",
  "International Development and Globalization",
  "International Economics and Development",
  "International Management",
  "International Studies and Modern Languages",
  "Juris Doctor",
  "Juris Doctor/Master of Arts",
  "Juris Doctor/MBA",
  "Lettres françaises",
  "Lettres françaises et éducation",
  "Licentiate in Law (LLL)",
  "Linguistics",
  "LLL & International Development and Globalization",
  "LLL/MBA",
  "Management",
  "Marketing",
  "Mathematics",
  "Mathematics and Economics",
  "Mechanical Engineering",
  "Mechanical Engineering and Computing Technology",
  "Medieval and Renaissance Studies",
  "Music",
  "Music and Science",
  "Nursing",
  "Ophthalmic Medical Technology",
  "Philosophy",
  "Philosophy and Political Science",
  "Physical Geography and Geomatics",
  "Physics",
  "Physics and Electrical Engineering",
  "Physics-Mathematics",
  "Political Science",
  "Political Science & Juris Doctor",
  "Political Science and Juris Doctor",
  "Psychology",
  "Psychology and Linguistic",
  "Public Administration",
  "Public Administration and Political Science",
  "Public Relations",
  "Religious Studies",
  "Second Language Teaching",
  "Social Sciences",
  "Social Work",
  "Sociology",
  "Software Engineering",
  "Statistics",
  "Teacher Education",
  "Theatre",
  "Translational and Molecular Medicine",
  "Undergraduate Medical Education",
  "Visual Arts",
  "World Languages and Cultures",
];

let westernPrograms = [
  "Arts and Humanities",
  "DAN Management and Organizational Studies",
  "Engineering",
  "Health Sciences",
  "Information and Media Studies",
  "Kinesiology",
  "Medical Sciences",
  "Music",
  "Nursing",
  "Science",
  "Social Science",
];

let uoftPrograms = [
  "Architectural Studies",
  "Chemical & Physical Sciences",
  "Chemical Engineering",
  "Civil Engineering",
  "Commerce",
  "Communication, Culture, Information & Technology",
  "Computer Engineering",
  "Computer Science",
  "Computer Science, Mathematics & Statistics",
  "Electrical Engineering",
  "Engineering Science",
  "Forensic Science",
  "French",
  "Humanities",
  "Industrial Engineering",
  "International Development Studies",
  "Journalism",
  "Kinesiology & Physical Education",
  "Life Sciences",
  "Management",
  "Management & Finance and Quantitative Finance",
  "Management and International Business",
  "Materials Engineering",
  "Mechanical Engineering",
  "Mineral Engineering",
  "Music - Artist",
  "Music - Music",
  "Music - Music Education",
  "Music - Performance",
  "Paramedicine",
  "Physical & Mathematical Sciences",
  "Physical and Environmental Sciences",
  "Pschology",
  "Psycological & Health Sciences",
  "Rotman Commerce",
  "Social Sciences",
  "Social Sciences & Humanities",
  "Theatre & Drama",
  "Undeclared Engineering",
  "Visual and Performing Arts, Arts Management & Media",
  "Visual Studies",
];

let mcmasterPrograms = [
  "Anatomy",
  "Arts and Science",
  "Bachelor of Technology",
  "Biology and Pharmacology",
  "Biomedical discovery and Commercialization",
  "Business",
  "Chemical and Physical Sciences",
  "Commerce",
  "Computer Science",
  "Economics",
  "Engineering",
  "Environmental and Earth Sciences",
  "Health and Society",
  "Health Science",
  "Humanities",
  "Integrated Biomedical and Health Sciences",
  "Integrated Business and Humanities",
  "Kinesiology",
  "Life sciences",
  "Mathematics and Statistics",
  "Medical Radiation",
  "Midwifery",
  "Music",
  "Nursing",
  "Physical Assistant",
  "Social Science",
  "Studio Arts",
];

let queensPrograms = [
  "Arts",
  "Commerce",
  "Computing",
  "Concurrent Education/Arts",
  "Concurrent Education/Fine Art",
  "Concurrent Education/Music",
  "Concurrent Education/Science",
  "Engineering and Applied Science",
  "Fine Art",
  "Health Sciences",
  "Kinesiology",
  "Music",
  "Music Theatre",
  "Nursing",
  "Science",
];

function populateDropdowns() {
  // initialize variables
  var loadFaculty;
  var loadProgram;
  var loadYear;
  var loadUniversity;

  var year = document.getElementById("year");

  const rawResponse = fetch("/dashboard/load/profile", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //load data received into variables
      loadFaculty = data["faculty"];
      loadProgram = data["program"];
      loadYear = data["year"];
      loadUniversity = data["university"];

      //convert to string format
      let sfaculty = loadFaculty.toString();
      let sprograms = loadProgram.toString();
      let syear = loadYear.toString();
      let suniversity = loadUniversity.toString();

      //get the datalist element for the program input
      let programList = document.getElementById("programs");

      //check which university the user goes to then populate the datalist of programs
      //with the options from that university's program array
      if (suniversity.localeCompare("University of Waterloo") === 0) {
        let listOptions = "";

        for (const tempProgram of waterlooPrograms) {
          listOptions += '<option value="' + tempProgram + '"/>';
        }

        programList.innerHTML = listOptions;
      } else if (suniversity.localeCompare("University of Ottawa") === 0) {
        let listOptions = "";

        for (const tempProgram of ottawaPrograms) {
          listOptions += '<option value="' + tempProgram + '"/>';
        }

        programList.innerHTML = listOptions;
      } else if (suniversity.localeCompare("Western University") === 0) {
        let listOptions = "";

        for (const tempProgram of westernPrograms) {
          listOptions += '<option value="' + tempProgram + '"/>';
        }

        programList.innerHTML = listOptions;
      } else if (suniversity.localeCompare("University of Toronto") === 0) {
        let listOptions = "";

        for (const tempProgram of uoftPrograms) {
          listOptions += '<option value="' + tempProgram + '"/>';
        }

        programList.innerHTML = listOptions;
      } else if (suniversity.localeCompare("Queen's University") === 0) {
        let listOptions = "";

        for (const tempProgram of queensPrograms) {
          listOptions += '<option value="' + tempProgram + '"/>';
        }

        programList.innerHTML = listOptions;
      } else if (suniversity.localeCompare("McMaster University") === 0) {
        let listOptions = "";

        for (const tempProgram of mcmasterPrograms) {
          listOptions += '<option value="' + tempProgram + '"/>';
        }

        programList.innerHTML = listOptions;
      }

      //set placeholder text for program and university fields
      document.getElementById("program").value = loadProgram;
      document.getElementById("university").placeholder = loadUniversity;

      //add options for the graduating year
      year.options[0] = new Option("2020", "2020");
      year.options[1] = new Option("2021", "2021");
      year.options[2] = new Option("2022", "2022");
      year.options[3] = new Option("2023", "2023");
      year.options[4] = new Option("2024", "2024");
      year.options[5] = new Option("2025", "2025");

      //loop over all of the year dropdown options and preselect one option according to
      //the user's pre-existing choice
      var k;
      var temp3;
      for (k = 0; k < year.options.length; k++) {
        temp3 = year.options[k].value;

        if (temp3.localeCompare(syear) === 0) {
          year.selectedIndex = k;
          break;
        }
      }
    });
}

// Listens for when save button is clicked
$("#save").click(function () {
  //get request to fetch the user's university and other info
  const rawResponse = fetch("/dashboard/load/profile", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      loadUniversity = data["university"];
      selectedUniversity = loadUniversity.toString();

      // var selectedFaculty = document.getElementById("faculty").value;
      var selectedProgram = document.getElementById("program").value;
      //var graduatingYear = document.getElementById("year").value;

      var validProgram = false;

      //check which university the person goes to and then compare their selected program
      // to the list of programs from their university. If it exists, set valid program true
      if (selectedUniversity.localeCompare("University of Waterloo") === 0) {
        if (waterlooPrograms.includes(selectedProgram)) {
          validProgram = true;
          console.log("validProgram in if: " + validProgram);
        }
      } else if (selectedUniversity.localeCompare("Queen's University") === 0) {
        if (queensPrograms.includes(selectedProgram)) {
          validProgram = true;
        }
      } else if (
        selectedUniversity.localeCompare("McMaster University") === 0
      ) {
        if (mcmasterPrograms.includes(selectedProgram)) {
          validProgram = true;
        }
      } else if (
        selectedUniversity.localeCompare("University of Toronto") === 0
      ) {
        if (uoftPrograms.includes(selectedProgram)) {
          validProgram = true;
        }
      } else if (
        selectedUniversity.localeCompare("University of Ottawa") === 0
      ) {
        if (ottawaPrograms.includes(selectedProgram)) {
          validProgram = true;
        }
      }

      //if user selects a valid program send a post req to db to update the info,
      // if they did not select valid program, open alert msg telling them to pick valid
      if (validProgram) {
        //create request body with the new information
        reqBody = {
          // fac: selectedFaculty,
          prog: selectedProgram,
          // year: graduatingYear,
        };

        //send post req to db which updates user's info
        const rawResponse = fetch("/dashboard/profile", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }).then((response) => console.log(response));

        //notify user info is saved and redirect them to dashboard home
        alert("Information Saved!");
        location.href = "/dashboard/home";
      } else {
        alert("Invalid program. Please select one from the list");
      }
    });
});
