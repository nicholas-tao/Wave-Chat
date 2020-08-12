//function which runs when DOM is ready i.e. upon page start - populates the faculty dropdown list
$(document).ready(populateDropdowns());

let waterlooPrograms = [
  "Accounting and Financial Management" , 
  "Actuarial Science" , 
  "Anthropology" , 
  "Applied Mathematics" , 
  "Architectural Engineering" , 
  "Architecture" , 
  "Bachelor of Arts" , 
  "Bachelor of Science" , 
  "Biochemistry" , 
  "Biology" , 
  "Biomedical Engineering" , 
  "Biomedical Sciences" , 
  "Biostatistics" , 
  "Biotechnology/Chartered Professional Accountancy" , 
  "Business Administration and Computer Science" , 
  "Business Administration and Mathematics" , 
  "Business programs" , 
  "Chemical Engineering" , 
  "Chemistry" , 
  "Civil Engineering" , 
  "Classical Studies" , 
  "Combinatorics and Optimization" , 
  "Communication Studies" , 
  "Computational Mathematics" , 
  "Computer Engineering" , 
  "Computer Science" , 
  "Computing and Financial Management" , 
  "Data Science" , 
  "Earth Sciences" , 
  "Economics" , 
  "Education" , 
  "Electrical Engineering" , 
  "English" , 
  "Environment and Business" , 
  "Environment, Resources and Sustainability" , 
  "Environmental Engineering" , 
  "Environmental Science" , 
  "Fine Arts" , 
  "French" , 
  "Gender and Social Justice" , 
  "Geography and Aviation" , 
  "Geography and Environmental Management" , 
  "Geological Engineering" , 
  "Geomatics" , 
  "German" , 
  "Global Business and Digital Arts" , 
  "Health Studies" , 
  "History" , 
  "Honours Arts" , 
  "Honours Arts and Business" , 
  "Honours Science" , 
  "Information Technology Management" , 
  "International Development" , 
  "Kinesiology" , 
  "Knowledge Integration" , 
  "Legal Studies" , 
  "Liberal Studies" , 
  "Life Physics" , 
  "Life Sciences" , 
  "Management Engineering" , 
  "Materials and Nanosciences" , 
  "Mathematical Economics" , 
  "Mathematical Finance" , 
  "Mathematical Optimization" , 
  "Mathematical Physics" , 
  "Mathematics" , 
  "Mathematics/Business Administration" , 
  "Mathematics/Chartered Professional Accountancy" , 
  "Mathematics/Financial Analysis and Risk Management" , 
  "Mathematics/Teaching" , 
  "Mechanical Engineering" , 
  "Mechatronics Engineering" , 
  "Medicinal Chemistry" , 
  "Medieval Studies" , 
  "Minors and specializations" , 
  "Music" , 
  "Nanotechnology Engineering" , 
  "Nursing" , 
  "Optometry" , 
  "Pathways to medical school and other health professions" , 
  "Peace and Conflict Studies" , 
  "Pharmacy" , 
  "Philosophy" , 
  "Physical Sciences" ,
   "Physics" , 
   "Physics and Astronomy" , 
   "Planning" , 
   "Political Science" , 
   "Pre-law" , 
   "Psychology" , 
   "Public Health" , 
   "Pure Mathematics" , 
   "Recreation and Leisure Studies" , 
   "Recreation and Sport Business" , 
   "Religious Studies" , 
   "Science and Aviation" , 
   "Science and Business" , 
   "Sexuality, Marriage, and Family Studies" , 
   "Social Development Studies" , 
   "Social Work" , 
   "Sociology" , 
   "Software Engineering" , 
   "Spanish" , 
   "Statistics" , 
   "Systems Design Engineering" , 
   "Teaching" , 
   "Theatre and Performance" , 
   "Therapeutic Recreation" , 
   "Tourism Development"
]

let ottawaPrograms = [
  "Accounting" , 
  "Acting" , 
  "Anthropology" , 
  "Anthropology and Sociology" , 
  "Art History" , 
  "Biochemistry" , 
  "Biochemistry and Chemical Engineering" , 
  "Biology" , 
  "Biomedical Mechanical Engineering" , 
  "Biomedical Mechanical Engineering and Computing Technology" , 
  "Biomedical Science" , 
  "Biopharmaceutical Science" , 
  "Business Technology Management" , 
  "Chemical Engineering" , 
  "Chemical Engineering and Computing Technology" , 
  "Chemistry" , 
  "Civil Engineering" , 
  "Civil Engineering and Computing Technology" , 
  "Commerce & Juris Doctor" , 
  "Commerce and Juris Doctor" , 
  "Communication" , 
  "Communication & Political Science" , 
  "Communication & Sociology" , 
  "Communication and Political Science" , 
  "Communication and Sociology" , 
  "Communication et lettres françaises" , 
  "Computer Engineering" , 
  "Computer Science" , 
  "Computer Science and Mathematics" , 
  "Conflict Studies and Human Rights" , 
  "Criminology" , 
  "Criminology and Feminist and Gender Studies" , 
  "Data Science" , 
  "Digital Journalism" , 
  "Economics" , 
  "Economics and Political Science" , 
  "Economics and Public Policy" , 
  "Electrical Engineering" , 
  "Electrical Engineering and Computing Technology" , 
  "English" , 
  "English as a Second Language" , 
  "Environmental Economics and Public Policy" , 
  "Environmental Geoscience" , 
  "Environmental Science" , 
  "Environmental Studies" , 
  "Ethics and Political Philosophy" , 
  "Feminist and Gender Studies" , 
  "Feminist and Gender Studies and Political Science" , 
  "Feminist and Gender Studies and Sociology" , 
  "Finance" , 
  "Financial Mathematics and Economics" , 
  "Food and Nutrition Sciences" , 
  "French as a Second Language" , 
  "Geography" , 
  "Geology" , 
  "Geology-Physics" , 
  "Greek and Roman Studies" , 
  "Health Sciences" , 
  "Healthcare Analytics" , 
  "History" , 
  "History and Political Science" , 
  "Human Kinetics" , 
  "Human Resource Management" , 
  "Indigenous Studies" , 
  "Integrated Food Sciences" , 
  "Interdisciplinary Studies" , 
  "International Development & Globalization" , 
  "International Development and Globalization" , 
  "International Economics and Development" , 
  "International Management" , 
  "International Studies and Modern Languages" , 
  "Juris Doctor" , 
  "Juris Doctor/Master of Arts" , 
  "Juris Doctor/MBA" , 
  "Lettres françaises" , 
  "Lettres françaises et éducation" , 
  "Licentiate in Law (LLL)" , 
  "Linguistics" , 
  "LLL & International Development and Globalization" , 
  "LLL/MBA" , 
  "Management" , 
  "Marketing" , 
  "Mathematics" , 
  "Mathematics and Economics" , 
  "Mechanical Engineering" , 
  "Mechanical Engineering and Computing Technology" , 
  "Medieval and Renaissance Studies" , 
  "Music" , 
  "Music and Science" , 
  "Nursing" , 
  "Ophthalmic Medical Technology" , 
  "Philosophy" , 
  "Philosophy and Political Science" , 
  "Physical Geography and Geomatics" , 
  "Physics" , 
  "Physics and Electrical Engineering" , 
  "Physics-Mathematics" , 
  "Political Science" , 
  "Political Science & Juris Doctor" , 
  "Political Science and Juris Doctor" , 
  "Psychology" , 
  "Psychology and Linguistic" , 
  "Public Administration" , 
  "Public Administration and Political Science" , 
  "Public Relations" , 
  "Religious Studies" , 
  "Second Language Teaching" , 
  "Social Sciences" , 
  "Social Work" , 
  "Sociology" , 
  "Software Engineering" , 
  "Statistics" , 
  "Teacher Education" , 
  "Theatre" , 
  "Translational and Molecular Medicine" , 
  "Undergraduate Medical Education" , 
  "Visual Arts" , 
  "World Languages and Cultures"
]

let westernPrograms = [
  "Arts and Humanities" , 
  "DAN Management and Organizational Studies" , 
  "Engineering" , 
  "Health Sciences" , 
  "Information and Media Studies" , 
  "Kinesiology" , 
  "Medical Sciences" , 
  "Music" , 
  "Nursing" , 
  "Science" , 
  "Social Science"
]

let uoftPrograms = [
  "Architectural Studies" , 
  "Chemical & Physical Sciences" , 
  "Chemical Engineering" , 
  "Civil Engineering" , 
  "Commerce" , 
  "Communication, Culture, Information & Technology" , 
  "Computer Engineering" , 
  "Computer Science" , 
  "Computer Science, Mathematics & Statistics" , 
  "Electrical Engineering" , 
  "Engineering Science" , 
  "Forensic Science" , 
  "French" , 
  "Humanities" , 
  "Industrial Engineering" , 
  "International Development Studies" , 
  "Journalism" , 
  "Kinesiology & Physical Education" , 
  "Life Sciences" , 
  "Management" , 
  "Management & Finance and Quantitative Finance" , 
  "Management and International Business" , 
  "Materials Engineering" , 
  "Mechanical Engineering" , 
  "Mineral Engineering" , 
  "Music - Artist" , 
  "Music - Music" , 
  "Music - Music Education" , 
  "Music - Performance" , 
  "Paramedicine" , 
  "Physical & Mathematical Sciences" , 
  "Physical and Environmental Sciences" , 
  "Pschology" , 
  "Psycological & Health Sciences" , 
  "Rotman Commerce" , 
  "Social Sciences" , 
  "Social Sciences & Humanities" , 
  "Theatre & Drama" , 
  "Undeclared Engineering" , 
  "Visual and Performing Arts, Arts Management & Media" , 
  "Visual Studies"
]

let mcmasterPrograms = [
  "Anatomy" , 
  "Arts and Science" , 
  "Bachelor of Technology" , 
  "Biology and Pharmacology" , 
  "Biomedical discovery and Commercialization" , 
  "Business" , 
  "Chemical and Physical Sciences" , 
  "Commerce" , 
  "Computer Science" , 
  "Economics" , 
  "Engineering" , 
  "Environmental and Earth Sciences" , 
  "Health and Society" , 
  "Health Science" , 
  "Humanities" , 
  "Integrated Biomedical and Health Sciences" , 
  "Integrated Business and Humanities" , 
  "Kinesiology" , 
  "Life sciences" , 
  "Mathematics and Statistics" , 
  "Medical Radiation" , 
  "Midwifery" , 
  "Music" , 
  "Nursing" , 
  "Physical Assistant" , 
  "Social Science" , 
  "Studio Arts"
]

let queensPrograms = []


function populateDropdowns() {
  var loadFaculty;
  var loadProgram;
  var loadYear;
  var loadUniversity;

  var faculty = document.getElementById("faculty");
  var programs = document.getElementById("program");
  var year = document.getElementById("year");
  var university = document.getElementById("university");

  const rawResponse = fetch("/dashboard/load/profile", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("data: ", data);
      loadFaculty = data["faculty"];
      loadProgram = data["program"];
      loadYear = data["year"];
      loadUniversity = data["university"];
      //console.log(loadFaculty);
      //console.log(loadProgram);
      //console.log(loadYear);
      //console.log('hi123456789');
      //console.log("uni: ", loadUniversity);
      let sfaculty = loadFaculty.toString();
      // faculty.value = sfaculty

      let sprograms = loadProgram.toString();
      // programs.value = sprograms

      let syear = loadYear.toString();

      let suniversity = loadUniversity.toString();

      let programList = document.getElementById("programs")


      if(suniversity.localeCompare("University of Waterloo") === 0){
        let listOptions = ''


        for(const tempProgram of waterlooPrograms){
          listOptions += '<option value="' + tempProgram + '"/>'
        }


        programList.innerHTML = listOptions

      }
      else if(suniversity.localeCompare("University of Ottawa") === 0){
        let listOptions = ''


        for(const tempProgram of ottawaPrograms){
          listOptions += '<option value="' + tempProgram + '"/>'
        }


        programList.innerHTML = listOptions
      }
      else if(suniversity.localeCompare("Western University") === 0){
        let listOptions = ''
        
        for(const tempProgram of westernPrograms){
          listOptions += '<option value="' + tempProgram + '"/>'
        }

        programList.innerHTML = listOptions

      }
      else if(suniversity.localeCompare("University of Toronto") === 0){

        let listOptions = ''

        for(const tempProgram of uoftPrograms){
          listOptions += '<option value="' + tempProgram + '"/>'
        }

        programList.innerHTML = listOptions
      }
      else if(suniversity.localeCompare("Queen's University") === 0){

        let listOptions = ''

        for(const tempProgram of queensPrograms){
          listOptions += '<option value="' + tempProgram + '"/>'
        }

        programList.innerHTML = listOptions
      }
      else if(suniversity.localeCompare("McMaster University") === 0){

        let listOptions = ''

        for(const tempProgram of mcmasterPrograms){
          listOptions += '<option value="' + tempProgram + '"/>'
        }

        programList.innerHTML = listOptions
      }

      document.getElementById("program").placeholder = loadProgram;
      document.getElementById("university").placeholder = loadUniversity;




      // graduatingYear.value = syear
      // programs.options[0] = loadProgram
      // year.options[0] = loadYear

      // if (sfaculty == "No Faculty Entered") {
      //   // console.log("nullllllll")
      //   faculty.options[0] = new Option(
      //     "--Select--",
      //     "none"
      //   ); /*Option(text, value, defaultSelected, selected)*/
      // } else {
      //   faculty.options[0] = new Option(
      //     sfaculty
      //   ); /*Option(text, value, defaultSelected, selected)*/
      // }
      faculty.options[0] = new Option(
        "--Select a Faculty--",
        "No Faculty Entered"
      );

      faculty.options[1] = new Option(
        "Faculty of Applied Health Sciences",
        "Faculty of Applied Health Sciences"
      );
      faculty.options[2] = new Option("Faculty of Arts", "Faculty of Arts");
      faculty.options[3] = new Option(
        "Faculty of Engineering",
        "Faculty of Engineering"
      );
      faculty.options[4] = new Option(
        "Faculty of Environment",
        "Faculty of Environment"
      );
      faculty.options[5] = new Option(
        "Faculty of Mathematics",
        "Faculty of Mathematics"
      );
      faculty.options[6] = new Option(
        "Faculty of Science",
        "Faculty of Science"
      );

      //set the default value of the dropdown to what the user selected
      var i;
      var temp;
      for (i = 0; i < faculty.options.length; i++) {
        temp = faculty.options[i].value;

        //console.log("temp: " + temp);

        if (temp.localeCompare(sfaculty) === 0) {
          //console.log("i made it here 8008");
          faculty.selectedIndex = i;
          break;
        }
      }

      var selectedFaculty = $('select[name="faculty"]').val();

      if (selectedFaculty == "Faculty of Applied Health Sciences") {
        programs.options.length = 0;
        programs.options[0] = new Option("--Select a Program--");
        programs.options[1] = new Option("Health Studies", "Health Studies");
        programs.options[2] = new Option("Kinesiology", "Kinesiology");
        programs.options[3] = new Option("Public Health", "Public Health");
        programs.options[4] = new Option(
          "Recreation and Leisure Studies",
          "Recreation and Leisure Studies"
        );
      } else if (selectedFaculty == "Faculty of Arts") {
        programs.options.length = 0;
        programs.options[0] = new Option("--Select a Program--");
        programs.options[1] = new Option("Honours Arts", "Honours Arts");
        programs.options[2] = new Option(
          "Honours Arts and Business",
          "Honours Arts and Business"
        );
        programs.options[3] = new Option(
          "Global Business and Digital Arts",
          "Global Business and Digital Arts"
        );
        programs.options[4] = new Option(
          "Social Development Studies",
          "Social Development Studies"
        );
        programs.options[5] = new Option(
          "Accounting and Financial Management",
          "Accounting and Financial Management"
        );
        programs.options[6] = new Option(
          "Computing and Financial Management",
          "Computing and Financial Management"
        );
      } else if (selectedFaculty == "Faculty of Engineering") {
        console.log("engineer");
        programs.options.length = 0;
        programs.options[0] = new Option("--Select a Program--");
        programs.options[1] = new Option(
          "Architectural Engineering",
          "Architectural Engineering"
        );
        programs.options[2] = new Option("Architecture", "Architecture");
        programs.options[3] = new Option(
          "Biomedical Engineering",
          "Biomedical Engineering"
        );
        programs.options[4] = new Option(
          "Chemical Engineering",
          "Chemical Engineering"
        );
        programs.options[5] = new Option(
          "Civil Engineering",
          "Civil Engineering"
        );
        programs.options[6] = new Option(
          "Computer Engineering",
          "Computer Engineering"
        );
        programs.options[7] = new Option(
          "Electrical Engineering",
          "Electrical Engineering"
        );
        programs.options[8] = new Option(
          "Environmental Engineering",
          "Environmental Engineering"
        );
        programs.options[9] = new Option(
          "Geological Engineering",
          "Geological Engineering"
        );
        programs.options[10] = new Option(
          "Management Engineering",
          "Management Engineering"
        );
        programs.options[11] = new Option(
          "Mechanical Engineering",
          "Mechanical Engineering"
        );
        programs.options[12] = new Option(
          "Mechatronics Engineering",
          "Mechatronics Engineering"
        );
        programs.options[13] = new Option(
          "Nanotechnology Engineering",
          "Nanotechnology Engineering"
        );
        programs.options[14] = new Option(
          "Software Engineering",
          "Software Engineering"
        );
        programs.options[15] = new Option(
          "Systems Design Engineering",
          "Systems Design Engineering"
        );
      } else if (selectedFaculty == "Faculty of Environment") {
        programs.options.length = 0;
        programs.options[0] = new Option("--Select a Program--");
        programs.options[1] = new Option(
          "Environment and Business",
          "Environment and Business"
        );
        programs.options[2] = new Option(
          "Environment, Resources and Sustainability",
          "Environment, Resources and Sustainability"
        );
        programs.options[3] = new Option(
          "Geography and Aviation",
          "Geography and Aviation"
        );
        programs.options[4] = new Option(
          "Geography and Environmental Management",
          "Geography and Environmental Management"
        );
        programs.options[5] = new Option("Geomatics", "Geomatics");
        programs.options[6] = new Option(
          "International Development",
          "International Development"
        );
        programs.options[7] = new Option(
          "Knowledge Integration",
          "Knowledge Integration"
        );
        programs.options[8] = new Option("Planning", "Planning");
      } else if (selectedFaculty == "Faculty of Mathematics") {
        programs.options.length = 0;
        programs.options[0] = new Option("--Select a Program--");
        programs.options[1] = new Option(
          "Business Administration and Computer Science Double Degree",
          "Business Administration and Computer Science Double Degree"
        );
        programs.options[2] = new Option(
          "Business Administration and Mathematics Double Degree",
          "Business Administration and Mathematics Double Degree"
        );
        programs.options[3] = new Option(
          "Computer Science",
          "Computer Science"
        );
        programs.options[4] = new Option(
          "Computing and Financial Management",
          "Computing and Financial Management"
        );
        programs.options[5] = new Option(
          "Honours Mathematics",
          "Honours Mathematics"
        );
        programs.options[6] = new Option(
          "Mathematics/Business Administration",
          "Mathematics/Business Administration"
        );
        programs.options[7] = new Option(
          "Mathematics/Chartered Professional Accountancy",
          "Mathematics/Chartered Professional Accountancy"
        );
        programs.options[8] = new Option(
          "Mathematics/Financial Analysis and Risk Management",
          "Mathematics/Financial Analysis and Risk Management"
        );
      } else if (selectedFaculty == "Faculty of Science") {
        programs.options.length = 0;
        programs.options[0] = new Option("--Select a Program--");
        programs.options[1] = new Option("Biochemistry", "Biochemistry");
        programs.options[2] = new Option("Biology", "Biology");
        programs.options[3] = new Option(
          "Biotechnology/Chartered Professional Accountancy",
          "Biotechnology/Chartered Professional Accountancy"
        );
        programs.options[4] = new Option(
          "Biotechnology/Economics",
          "Biotechnology/Economics"
        );
        programs.options[5] = new Option("Chemistry", "Chemistry");
        programs.options[6] = new Option(
          "Conditional Admission to Pharmacy",
          "Conditional Admission to Pharmacy"
        );
        programs.options[7] = new Option("Earth Sciences", "Earth Sciences");
        programs.options[8] = new Option(
          "Environmental Science",
          "Environmental Science"
        );
        programs.options[9] = new Option("Honours Science", "Honours Science");
        programs.options[10] = new Option("Life Physics", "Life Physics");
        programs.options[11] = new Option(
          "Materials and Nanosciences",
          "Materials and Nanosciences"
        );
        programs.options[12] = new Option(
          "Mathematical Physics",
          "Mathematical Physics"
        );
        programs.options[13] = new Option(
          "Medicinal Chemistry",
          "Medicinal Chemistry"
        );
        programs.options[14] = new Option("Physics", "Physics");
        programs.options[15] = new Option(
          "Physics and Astronomy",
          "Physics and Astronomy"
        );
        programs.options[16] = new Option("Psychology", "Psychology");
        programs.options[17] = new Option(
          "Science and Aviation",
          "Science and Aviation"
        );
        programs.options[18] = new Option(
          "Science and Business",
          "Science and Business"
        );
      } else {
        programs.options.length = 0;
        programs.options[0] = new Option("--Select a Faculty--", "none");
      }
      var j;
      var temp2;
      for (j = 0; j < programs.options.length; j++) {
        temp2 = programs.options[j].value;

        //console.log("temp2: " + temp2);

        if (temp2.localeCompare(sprograms) === 0) {
          //console.log("i made it here 9009");
          programs.selectedIndex = j;
          break;
        }
      }

      // programs.options.length = 0;
      // if (sprograms == "No Program Entered") {
      //   programs.options[0] = new Option("--Select a Faculty--", "none");
      // } else {
      //   programs.options[0] = new Option(sprograms);
      // }

      // var j;
      // var temp2;
      // for (j = 0; j < programs.options.length; j++) {

      //   temp = programs.options[j].value

      //   console.log("temp: " + temp)

      //   if((temp).localeCompare(sprograms) === 0){
      //     console.log("i made it here 8008")
      //     programs.selectedIndex = j
      //     break
      //   }
      // }

      // var j;
      // var temp2;
      // for (j = 0; j < programs.options.length; j++) {

      //   temp2 = programs.options[j].value

      //   console.log("temp2: " + temp2)

      //   if((temp2).localeCompare(sprograms) === 0){
      //     console.log("i made it here 9009")
      //     programs.selectedIndex = j
      //     break
      //   }
      // }

      //function which checks which faculty is selected and populates program dropdown accordingly
      $('select[name="faculty"]').change(function () {
        var programs = document.getElementById("program");

        var selectedFaculty = $(this).val();

        if (selectedFaculty == "Faculty of Applied Health Sciences") {
          programs.options.length = 0;
          programs.options[0] = new Option("--Select a Program--");
          programs.options[1] = new Option("Health Studies", "Health Studies");
          programs.options[2] = new Option("Kinesiology", "Kinesiology");
          programs.options[3] = new Option("Public Health", "Public Health");
          programs.options[4] = new Option(
            "Recreation and Leisure Studies",
            "Recreation and Leisure Studies"
          );
        } else if (selectedFaculty == "Faculty of Arts") {
          programs.options.length = 0;
          programs.options[0] = new Option("--Select a Program--");
          programs.options[1] = new Option("Honours Arts", "Honours Arts");
          programs.options[2] = new Option(
            "Honours Arts and Business",
            "Honours Arts and Business"
          );
          programs.options[3] = new Option(
            "Global Business and Digital Arts",
            "Global Business and Digital Arts"
          );
          programs.options[4] = new Option(
            "Social Development Studies",
            "Social Development Studies"
          );
          programs.options[5] = new Option(
            "Accounting and Financial Management",
            "Accounting and Financial Management"
          );
          programs.options[6] = new Option(
            "Computing and Financial Management",
            "Computing and Financial Management"
          );
        } else if (selectedFaculty == "Faculty of Engineering") {
          console.log("engineer");
          programs.options.length = 0;
          programs.options[0] = new Option("--Select a Program--");
          programs.options[1] = new Option(
            "Architectural Engineering",
            "Architectural Engineering"
          );
          programs.options[2] = new Option("Architecture", "Architecture");
          programs.options[3] = new Option(
            "Biomedical Engineering",
            "Biomedical Engineering"
          );
          programs.options[4] = new Option(
            "Chemical Engineering",
            "Chemical Engineering"
          );
          programs.options[5] = new Option(
            "Civil Engineering",
            "Civil Engineering"
          );
          programs.options[6] = new Option(
            "Computer Engineering",
            "Computer Engineering"
          );
          programs.options[7] = new Option(
            "Electrical Engineering",
            "Electrical Engineering"
          );
          programs.options[8] = new Option(
            "Environmental Engineering",
            "Environmental Engineering"
          );
          programs.options[9] = new Option(
            "Geological Engineering",
            "Geological Engineering"
          );
          programs.options[10] = new Option(
            "Management Engineering",
            "Management Engineering"
          );
          programs.options[11] = new Option(
            "Mechanical Engineering",
            "Mechanical Engineering"
          );
          programs.options[12] = new Option(
            "Mechatronics Engineering",
            "Mechatronics Engineering"
          );
          programs.options[13] = new Option(
            "Nanotechnology Engineering",
            "Nanotechnology Engineering"
          );
          programs.options[14] = new Option(
            "Software Engineering",
            "Software Engineering"
          );
          programs.options[15] = new Option(
            "Systems Design Engineering",
            "Systems Design Engineering"
          );
        } else if (selectedFaculty == "Faculty of Environment") {
          programs.options.length = 0;
          programs.options[0] = new Option("--Select a Program--");
          programs.options[1] = new Option(
            "Environment and Business",
            "Environment and Business"
          );
          programs.options[2] = new Option(
            "Environment, Resources and Sustainability",
            "Environment, Resources and Sustainability"
          );
          programs.options[3] = new Option(
            "Geography and Aviation",
            "Geography and Aviation"
          );
          programs.options[4] = new Option(
            "Geography and Environmental Management",
            "Geography and Environmental Management"
          );
          programs.options[5] = new Option("Geomatics", "Geomatics");
          programs.options[6] = new Option(
            "International Development",
            "International Development"
          );
          programs.options[7] = new Option(
            "Knowledge Integration",
            "Knowledge Integration"
          );
          programs.options[8] = new Option("Planning", "Planning");
        } else if (selectedFaculty == "Faculty of Mathematics") {
          programs.options.length = 0;
          programs.options[0] = new Option("--Select a Program--");
          programs.options[1] = new Option(
            "Business Administration and Computer Science Double Degree",
            "Business Administration and Computer Science Double Degree"
          );
          programs.options[2] = new Option(
            "Business Administration and Mathematics Double Degree",
            "Business Administration and Mathematics Double Degree"
          );
          programs.options[3] = new Option(
            "Computer Science",
            "Computer Science"
          );
          programs.options[4] = new Option(
            "Computing and Financial Management",
            "Computing and Financial Management"
          );
          programs.options[5] = new Option(
            "Honours Mathematics",
            "Honours Mathematics"
          );
          programs.options[6] = new Option(
            "Mathematics/Business Administration",
            "Mathematics/Business Administration"
          );
          programs.options[7] = new Option(
            "Mathematics/Chartered Professional Accountancy",
            "Mathematics/Chartered Professional Accountancy"
          );
          programs.options[8] = new Option(
            "Mathematics/Financial Analysis and Risk Management",
            "Mathematics/Financial Analysis and Risk Management"
          );
        } else if (selectedFaculty == "Faculty of Science") {
          programs.options.length = 0;
          programs.options[0] = new Option("--Select a Program--");
          programs.options[1] = new Option("Biochemistry", "Biochemistry");
          programs.options[2] = new Option("Biology", "Biology");
          programs.options[3] = new Option(
            "Biotechnology/Chartered Professional Accountancy",
            "Biotechnology/Chartered Professional Accountancy"
          );
          programs.options[4] = new Option(
            "Biotechnology/Economics",
            "Biotechnology/Economics"
          );
          programs.options[5] = new Option("Chemistry", "Chemistry");
          programs.options[6] = new Option(
            "Conditional Admission to Pharmacy",
            "Conditional Admission to Pharmacy"
          );
          programs.options[7] = new Option("Earth Sciences", "Earth Sciences");
          programs.options[8] = new Option(
            "Environmental Science",
            "Environmental Science"
          );
          programs.options[9] = new Option(
            "Honours Science",
            "Honours Science"
          );
          programs.options[10] = new Option("Life Physics", "Life Physics");
          programs.options[11] = new Option(
            "Materials and Nanosciences",
            "Materials and Nanosciences"
          );
          programs.options[12] = new Option(
            "Mathematical Physics",
            "Mathematical Physics"
          );
          programs.options[13] = new Option(
            "Medicinal Chemistry",
            "Medicinal Chemistry"
          );
          programs.options[14] = new Option("Physics", "Physics");
          programs.options[15] = new Option(
            "Physics and Astronomy",
            "Physics and Astronomy"
          );
          programs.options[16] = new Option("Psychology", "Psychology");
          programs.options[17] = new Option(
            "Science and Aviation",
            "Science and Aviation"
          );
          programs.options[18] = new Option(
            "Science and Business",
            "Science and Business"
          );
        } else {
          programs.options.length = 0;
          programs.options[0] = new Option("--Select a Faculty--", "none");
        }
        var j;
        var temp2;
        for (j = 0; j < programs.options.length; j++) {
          temp2 = programs.options[j].value;

          //console.log("temp2: " + temp2);

          if (temp2.localeCompare(sprograms) === 0) {
            //  console.log("i made it here 9009");
            programs.selectedIndex = j;
            break;
          }
        }
      });

      // if (syear == "0") {
      //   year.options[0] = new Option("2020");
      // } else {
      //   year.options[0] = new Option(syear);
      // }

      year.options[0] = new Option("2020", "2020");
      year.options[1] = new Option("2021", "2021");
      year.options[2] = new Option("2022", "2022");
      year.options[3] = new Option("2023", "2023");
      year.options[4] = new Option("2024", "2024");
      year.options[5] = new Option("2025", "2025");

      var k;
      var temp3;
      for (k = 0; k < year.options.length; k++) {
        temp3 = year.options[k].value;

        //console.log("temp2: " + temp3);

        if (temp3.localeCompare(syear) === 0) {
          //console.log("i made it here 9009");
          year.selectedIndex = k;
          break;
        }
      }
    });
}

// .then((resp) => resp.json())
// .then(function(data){
//   loadFaculty = data["faculty"]
//   loadProgram = data["program"]
//   loadYear = data["year"]
//   console.log(loadFaculty)
//   console.log(loadProgram)
//   console.log(loadYear)

// })

$("#save").click(function () {
  // var selectedFaculty = $('select[id="faculty"]').val
  // var selectedProgram = $('select[id="program"]').val




  const rawResponse = fetch("/dashboard/load/profile", {
    method: "GET", 
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      loadUniversity = data["university"]
      selectedUniversity = loadUniversity.toString()

      var selectedFaculty = document.getElementById("faculty").value;
      var selectedProgram = document.getElementById("program").value;
      var graduatingYear = document.getElementById("year").value;

      var validProgram = false

      console.log("Program: " + selectedProgram)
      console.log("Item at index" + waterlooPrograms[25])
      console.log("Includes program: " + waterlooPrograms.includes(selectedProgram))
      console.log(selectedUniversity)
      console.log(selectedUniversity.localeCompare("University of Waterloo"))
    
      if(selectedUniversity.localeCompare("University of Waterloo") === 0){
        if(waterlooPrograms.includes(selectedProgram)){
          validProgram = true
          console.log("validProgram in if: " + validProgram)
        }
      }
      else if(selectedUniversity.localeCompare("Queen's University") === 0){
        if(queensPrograms.includes(selectedProgram)){
          validProgram = true
        }
      }
      else if(selectedUniversity.localeCompare("McMaster University") === 0){
        if(mcmasterPrograms.includes(selectedProgram)){
          validProgram = true
        }
      }
      else if(selectedUniversity.localeCompare("University of Toronto") === 0){
        if(uoftPrograms.includes(selectedProgram)){
          validProgram = true
        }
      }
      else if(selectedUniversity.localeCompare("University of Ottawa") === 0){
        if(ottawaPrograms.includes(selectedProgram)){
          validProgram = true
        }
      }
    
      console.log("validProgram: " + validProgram)
    
    
      if(validProgram){
        reqBody = {
          fac: selectedFaculty,
          prog: selectedProgram,
          year: graduatingYear,
        };
        const rawResponse = fetch("/dashboard/profile", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }).then((response) => console.log(response));
        console.log("request sent");
      
        alert("Information Saved!");
        location.href = "/dashboard/home";
      }
      else{
        alert("Invalid program. Please select one from the list");
      }

    })

  // var selectedUniversity = document.getElementById("university").value;
  // var selectedFaculty = document.getElementById("faculty").value;
  // var selectedProgram = document.getElementById("program").value;
  // var graduatingYear = document.getElementById("year").value;

  // var validProgram = false

  // console.log("Program: " + selectedProgram)
  // console.log("Item at index" + waterlooPrograms[25])
  // console.log("Includes program: " + waterlooPrograms.includes(selectedProgram))
  // console.log(selectedUniversity)
  // console.log(selectedUniversity.localeCompare("University of Waterloo"))

  // if(selectedUniversity.localeCompare("University of Waterloo") === 0){
  //   if(waterlooPrograms.includes(selectedProgram)){
  //     validProgram = true
  //     console.log("validProgram in if: " + validProgram)
  //   }
  // }
  // else if(selectedUniversity.localeCompare("Queen's University") === 0){
  //   if(queensPrograms.includes(selectedProgram)){
  //     validProgram = true
  //   }
  // }
  // else if(selectedUniversity.localeCompare("McMaster University") === 0){
  //   if(mcmasterPrograms.includes(selectedProgram)){
  //     validProgram = true
  //   }
  // }
  // else if(selectedUniversity.localeCompare("University of Toronto") === 0){
  //   if(uoftPrograms.includes(selectedProgram)){
  //     validProgram = true
  //   }
  // }
  // else if(selectedUniversity.localeCompare("University of Ottawa") === 0){
  //   if(ottawaPrograms.includes(selectedProgram)){
  //     validProgram = true
  //   }
  // }

  // console.log("validProgram: " + validProgram)


  // if(validProgram){
  //   reqBody = {
  //     fac: selectedFaculty,
  //     prog: selectedProgram,
  //     year: graduatingYear,
  //   };
  //   const rawResponse = fetch("/dashboard/profile", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(reqBody),
  //   }).then((response) => console.log(response));
  //   console.log("request sent");
  
  //   alert("Information Saved!");
  //   location.href = "/dashboard/home";
  // }
  // else{
  //   alert("Invalid program. Please select one from the list");
  // }
  // no validation on the faculty or program selected since they can leave it blank if they want
  // send post or patch request to db here to update the faculty and program of user
  
});
