//function which runs when DOM is ready i.e. upon page start - populates the faculty dropdown list
$(document).ready(populateDropdowns());

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

        listOptions += '<option value="Accounting and Financial Management"/>'
        listOptions += '<option value="Actuarial Science"/>'
        listOptions += '<option value="Anthropology"/>'
        listOptions += '<option value="Applied Mathematics"/>'
        listOptions += '<option value="Architectural Engineering"/>'
        listOptions += '<option value="Architecture"/>'
        listOptions += '<option value="Bachelor of Arts"/>'
        listOptions += '<option value="Bachelor of Science"/>'
        listOptions += '<option value=Biochemistry""/>'
        listOptions += '<option value="Biology"/>'
        listOptions += '<option value="Biomedical Engineering"/>'
        listOptions += '<option value="Biomedical Sciences"/>'
        listOptions += '<option value="Biostatistics"/>'
        listOptions += '<option value="Biotechnology/Chartered Professional Accountancy"/>'
        listOptions += '<option value="Business Administration and Computer Science"/>'
        listOptions += '<option value="Business Administration and Mathematics"/>'
        listOptions += '<option value="Business programs"/>'
        listOptions += '<option value="Chemical Engineering"/>'
        listOptions += '<option value="Chemistry"/>'
        listOptions += '<option value="Civil Engineering"/>'
        listOptions += '<option value="Classical Studies"/>'
        listOptions += '<option value="Co-op programs"/>'
        listOptions += '<option value="Combinatorics and Optimization"/>'
        listOptions += '<option value="Communication Studies"/>'
        listOptions += '<option value="Computational Mathematics"/>'
        listOptions += '<option value="Computer Engineering"/>'
        listOptions += '<option value="Computer Science"/>'
        listOptions += '<option value="Computing and Financial Management"/>'
        listOptions += '<option value="Data Science"/>'
        listOptions += '<option value="Earth Sciences"/>'
        listOptions += '<option value="Economics"/>'
        listOptions += '<option value="Education"/>'
        listOptions += '<option value="Electrical Engineering"/>'
        listOptions += '<option value="English"/>'
        listOptions += '<option value="Environment and Business"/>'
        listOptions += '<option value="Environment, Resources and Sustainability"/>'
        listOptions += '<option value="Environmental Engineering"/>'
        listOptions += '<option value="Environmental Science"/>'
        listOptions += '<option value="Fine Arts"/>'
        listOptions += '<option value="French"/>'
        listOptions += '<option value="Gender and Social Justice"/>'
        listOptions += '<option value="Geography and Aviation"/>'
        listOptions += '<option value="Geography and Environmental Management"/>'
        listOptions += '<option value="Geological Engineering"/>'
        listOptions += '<option value="Geomatics"/>'
        listOptions += '<option value="German"/>'
        listOptions += '<option value="Global Business and Digital Arts"/>'
        listOptions += '<option value="Health Studies"/>'
        listOptions += '<option value="History"/>'
        listOptions += '<option value="Honours Arts"/>'
        listOptions += '<option value="Honours Arts and Business"/>'
        listOptions += '<option value="Honours Science"/>'
        listOptions += '<option value="Information Technology Management"/>'
        listOptions += '<option value="International Development"/>'
        listOptions += '<option value="Kinesiology"/>'
        listOptions += '<option value="Knowledge Integration"/>'
        listOptions += '<option value="Legal Studies"/>'
        listOptions += '<option value="Liberal Studies"/>'
        listOptions += '<option value="Life Physics"/>'
        listOptions += '<option value="Life Sciences"/>'
        listOptions += '<option value="Management Engineering"/>'
        listOptions += '<option value="Materials and Nanosciences"/>'
        listOptions += '<option value="Mathematical Economics"/>'
        listOptions += '<option value="Mathematical Finance"/>'
        listOptions += '<option value="Mathematical Optimization"/>'
        listOptions += '<option value="Mathematical Physics"/>'
        listOptions += '<option value="Mathematics"/>'
        listOptions += '<option value="Mathematics/Business Administration"/>'
        listOptions += '<option value="Mathematics/Chartered Professional Accountancy"/>'
        listOptions += '<option value="Mathematics/Financial Analysis and Risk Management"/>'
        listOptions += '<option value="Mathematics/Teaching"/>'
        listOptions += '<option value="Mechanical Engineering"/>'
        listOptions += '<option value="Mechatronics Engineering"/>'
        listOptions += '<option value="Medicinal Chemistry"/>'
        listOptions += '<option value="Medieval Studies"/>'
        listOptions += '<option value="Minors and specializations"/>'
        listOptions += '<option value="Music"/>'
        listOptions += '<option value="Nanotechnology Engineering"/>'
        listOptions += '<option value="Nursing"/>'
        listOptions += '<option value="Optometry"/>'
        listOptions += '<option value="Pathways to medical school and other health professions"/>'
        listOptions += '<option value="Peace and Conflict Studies"/>'
        listOptions += '<option value="Pharmacy"/>'
        listOptions += '<option value="Philosophy"/>'
        listOptions += '<option value="Physical Sciences"/>'
        listOptions += '<option value="Physics"/>'
        listOptions += '<option value="Physics and Astronomy"/>'
        listOptions += '<option value="Planning"/>'
        listOptions += '<option value="Political Science"/>'
        listOptions += '<option value="Pre-law"/>'
        listOptions += '<option value="Psychology"/>'
        listOptions += '<option value="Public Health"/>'
        listOptions += '<option value="Pure Mathematics"/>'
        listOptions += '<option value="Recreation and Leisure Studies"/>'
        listOptions += '<option value="Recreation and Sport Business"/>'
        listOptions += '<option value="Religious Studies"/>'
        listOptions += '<option value="Science and Aviation"/>'
        listOptions += '<option value="Science and Business"/>'
        listOptions += '<option value="Sexuality, Marriage, and Family Studies"/>'
        listOptions += '<option value="Social Development Studies"/>'
        listOptions += '<option value="Social Work"/>'
        listOptions += '<option value="Sociology"/>'
        listOptions += '<option value="Software Engineering"/>'
        listOptions += '<option value="Spanish"/>'
        listOptions += '<option value="Statistics"/>'
        listOptions += '<option value="Systems Design Engineering"/>'
        listOptions += '<option value="Teaching"/>'
        listOptions += '<option value="Theatre and Performance"/>'
        listOptions += '<option value="Therapeutic Recreation"/>'
        listOptions += '<option value="Tourism Development"/>'

        programList.innerHTML = listOptions

      }
      else if(suniversity.localeCompare("University of Ottawa") === 0){
        let listOptions = ''

        listOptions += '<option value="Accounting"/>'
        listOptions += '<option value="Acting"/>'
        listOptions += '<option value="Anthropology and Sociology"/>'
        listOptions += '<option value="Anthropology"/>'
        listOptions += '<option value="Art History"/>'
        listOptions += '<option value="Biochemistry and Chemical Engineering "/>'
        listOptions += '<option value="Biochemistry"/>'
        listOptions += '<option value="Biology"/>'
        listOptions += '<option value="Biomedical Mechanical Engineering and Computing Technology "/>'
        listOptions += '<option value="Biomedical Mechanical Engineering"/>'
        listOptions += '<option value="Biomedical Science"/>'
        listOptions += '<option value="Biopharmaceutical Science"/>'
        listOptions += '<option value="Business Technology Management"/>'
        listOptions += '<option value="Chemical Engineering and Computing Technology"/>'
        listOptions += '<option value="Chemical Engineering"/>'
        listOptions += '<option value="Chemistry"/>'
        listOptions += '<option value="Civil Engineering and Computing Technology "/>'
        listOptions += '<option value="Civil Engineering"/>'
        listOptions += '<option value="Commerce & Juris Doctor"/>'
        listOptions += '<option value="Commerce and Juris Doctor "/>'
        listOptions += '<option value="Communication & Political Science"/>'
        listOptions += '<option value="Communication & Sociology"/>'
        listOptions += '<option value="Communication and Political Science "/>'
        listOptions += '<option value="Communication and Sociology "/>'
        listOptions += '<option value="Communication et lettres françaises"/>'
        listOptions += '<option value="Communication"/>'
        listOptions += '<option value="Computer Engineering"/>'
        listOptions += '<option value="Computer Science and Mathematics"/>'
        listOptions += '<option value="Computer Science"/>'
        listOptions += '<option value="Conflict Studies and Human Rights"/>'
        listOptions += '<option value="Criminology and Feminist and Gender Studies"/>'
        listOptions += '<option value="Criminology"/>'
        listOptions += '<option value="Data Science"/>'
        listOptions += '<option value="Digital Journalism"/>'
        listOptions += '<option value="Economics and Political Science"/>'
        listOptions += '<option value="Economics and Public Policy"/>'
        listOptions += '<option value="Economics"/>'
        listOptions += '<option value="Electrical Engineering and Computing Technology "/>'
        listOptions += '<option value="Electrical Engineering"/>'
        listOptions += '<option value="English as a Second Language"/>'
        listOptions += '<option value="English"/>'
        listOptions += '<option value="Environmental Economics and Public Policy"/>'
        listOptions += '<option value="Environmental Geoscience"/>'
        listOptions += '<option value="Environmental Science"/>'
        listOptions += '<option value="Environmental Studies"/>'
        listOptions += '<option value="Ethics and Political Philosophy"/>'
        listOptions += '<option value="Feminist and Gender Studies and Political Science"/>'
        listOptions += '<option value="Feminist and Gender Studies and Sociology"/>'
        listOptions += '<option value="Feminist and Gender Studies"/>'
        listOptions += '<option value="Finance"/>'
        listOptions += '<option value="Financial Mathematics and Economics "/>'
        listOptions += '<option value="Food and Nutrition Sciences"/>'
        listOptions += '<option value="French as a Second Language"/>'
        listOptions += '<option value="Geography"/>'
        listOptions += '<option value="Geology"/>'
        listOptions += '<option value="Geology-Physics"/>'
        listOptions += '<option value="Greek and Roman Studies"/>'
        listOptions += '<option value="Health Sciences"/>'
        listOptions += '<option value="Healthcare Analytics"/>'
        listOptions += '<option value="History and Political Science"/>'
        listOptions += '<option value="History"/>'
        listOptions += '<option value="Human Kinetics"/>'
        listOptions += '<option value="Human Resource Management"/>'
        listOptions += '<option value="Indigenous Studies"/>'
        listOptions += '<option value="Integrated Food Sciences"/>'
        listOptions += '<option value="Interdisciplinary Studies"/>'
        listOptions += '<option value="International Development & Globalization"/>'
        listOptions += '<option value="International Development and Globalization"/>'
        listOptions += '<option value="International Economics and Development"/>'
        listOptions += '<option value="International Management"/>'
        listOptions += '<option value="International Studies and Modern Languages"/>'
        listOptions += '<option value="Juris Doctor"/>'
        listOptions += '<option value="Juris Doctor/Master of Arts"/>'
        listOptions += '<option value="Juris Doctor/MBA"/>'
        listOptions += '<option value="Lettres françaises et éducation"/>'
        listOptions += '<option value="Lettres françaises"/>'
        listOptions += '<option value="Licentiate in Law (LLL)"/>'
        listOptions += '<option value="Linguistics"/>'
        listOptions += '<option value="LLL & International Development and Globalization"/>'
        listOptions += '<option value="LLL/MBA"/>'
        listOptions += '<option value="Management"/>'
        listOptions += '<option value="Marketing"/>'
        listOptions += '<option value="Mathematics and Economics "/>'
        listOptions += '<option value="Mathematics"/>'
        listOptions += '<option value="Mechanical Engineering and Computing Technology "/>'
        listOptions += '<option value="Mechanical Engineering"/>'
        listOptions += '<option value="Medieval and Renaissance Studies"/>'
        listOptions += '<option value="Music "/>'
        listOptions += '<option value="Music and Science "/>'
        listOptions += '<option value="Nursing"/>'
        listOptions += '<option value="Ophthalmic Medical Technology"/>'
        listOptions += '<option value="Philosophy and Political Science "/>'
        listOptions += '<option value="Philosophy"/>'
        listOptions += '<option value="Physical Geography and Geomatics"/>'
        listOptions += '<option value="Physics and Electrical Engineering "/>'
        listOptions += '<option value="Physics"/>'
        listOptions += '<option value="Physics-Mathematics"/>'
        listOptions += '<option value="Political Science & Juris Doctor"/>'
        listOptions += '<option value="Political Science and Juris Doctor "/>'
        listOptions += '<option value="Political Science"/>'
        listOptions += '<option value="Psychology "/>'
        listOptions += '<option value="Psychology and Linguistic"/>'
        listOptions += '<option value="Public Administration and Political Science"/>'
        listOptions += '<option value="Public Administration"/>'
        listOptions += '<option value="Public Relations"/>'
        listOptions += '<option value="Religious Studies"/>'
        listOptions += '<option value="Second Language Teaching"/>'
        listOptions += '<option value="Social Sciences"/>'
        listOptions += '<option value="Social Work"/>'
        listOptions += '<option value="Sociology"/>'
        listOptions += '<option value="Software Engineering"/>'
        listOptions += '<option value="Statistics"/>'
        listOptions += '<option value="Teacher Education"/>'
        listOptions += '<option value="Theatre"/>'
        listOptions += '<option value="Translational and Molecular Medicine"/>'
        listOptions += '<option value="Undergraduate Medical Education"/>'
        listOptions += '<option value="Visual Arts "/>'
        listOptions += '<option value="World Languages and Cultures"/>'



        programList.innerHTML = listOptions
      }
      else if(suniversity.localeCompare("Western University") === 0){
        let listOptions = ''
        
        listOptions += '<option value="Arts and Humanities"/>'
        listOptions += '<option value="Engineering"/>'
        listOptions += '<option value="Health Sciences"/>'
        listOptions += '<option value="Kinesiology"/>'
        listOptions += '<option value="Nursing"/>'
        listOptions += '<option value="Information and Media Studies"/>'
        listOptions += '<option value="Music"/>'
        listOptions += '<option value="Science"/>'
        listOptions += '<option value="Medical Sciences"/>'
        listOptions += '<option value="Social Science"/>'
        listOptions += '<option value="DAN Management and Organizational Studies"/>'

        programList.innerHTML = listOptions

      }
      else if(suniversity.localeCompare("University of Toronto") === 0){

        let listOptions = ''

        listOptions += '<option value="Undeclared Engineering"/>'
        listOptions += '<option value="Chemical Engineering"/>'
        listOptions += '<option value="Civil Engineering"/>'
        listOptions += '<option value="Computer Engineering"/>'
        listOptions += '<option value="Electrical Engineering"/>'
        listOptions += '<option value="Engineering Science"/>'
        listOptions += '<option value="Industrial Engineering"/>'
        listOptions += '<option value="Materials Engineering"/>'
        listOptions += '<option value="Mechanical Engineering"/>'
        listOptions += '<option value="Mineral Engineering"/>'
        listOptions += '<option value="Architectural Studies"/>'
        listOptions += '<option value="Visual Studies"/>'
        listOptions += '<option value="Computer Science"/>'
        listOptions += '<option value="Humanities"/>'
        listOptions += '<option value="Life Sciences"/>'
        listOptions += '<option value="Physical & Mathematical Sciences"/>'
        listOptions += '<option value="Rotman Commerce"/>'
        listOptions += '<option value="Social Sciences"/>'
        listOptions += '<option value="Kinesiology & Physical Education"/>'
        listOptions += '<option value="Music - Artist"/>'
        listOptions += '<option value="Music - Music"/>'
        listOptions += '<option value="Music - Music Education"/>'
        listOptions += '<option value="Music - Performance"/>'
        listOptions += '<option value="Chemical & Physical Sciences"/>'
        listOptions += '<option value="Commerce"/>'
        listOptions += '<option value="Communication, Culture, Information & Technology"/>'
        listOptions += '<option value="Computer Science, Mathematics & Statistics"/>'
        listOptions += '<option value="Forensic Science"/>'
        listOptions += '<option value="Humanities"/>'
        listOptions += '<option value="Life Sciences"/>'
        listOptions += '<option value="Management"/>'
        listOptions += '<option value="Pschology"/>'
        listOptions += '<option value="Social Sciences"/>'
        listOptions += '<option value="Theatre & Drama"/>'
        listOptions += '<option value="Visual Studies"/>'
        listOptions += '<option value="Social Sciences & Humanities"/>'
        listOptions += '<option value="International Development Studies"/>'
        listOptions += '<option value="French"/>'
        listOptions += '<option value="Journalism"/>'
        listOptions += '<option value="Visual and Performing Arts, Arts Management & Media"/>'
        listOptions += '<option value="Management"/>'
        listOptions += '<option value="Management and International Business"/>'
        listOptions += '<option value="Management & Finance and Quantitative Finance"/>'
        listOptions += '<option value="Computer Science, Mathematics & Statistics"/>'
        listOptions += '<option value="Life Sciences"/>'
        listOptions += '<option value="Paramedicine"/>'
        listOptions += '<option value="Physical and Environmental Sciences"/>'
        listOptions += '<option value="Psycological & Health Sciences"/>'

        programList.innerHTML = listOptions
      }
      else if(suniversity.localeCompare("Queen's University") === 0){

        let listOptions = ''

        listOptions += '<option value=""/>'

        programList.innerHTML = listOptions
      }
      else if(suniversity.localeCompare("McMaster University") === 0){

        let listOptions = ''

        listOptions += '<option value="Anatomy"/>'
        listOptions += '<option value="Arts and Science"/>'
        listOptions += '<option value="Bachelor of Technology"/>'
        listOptions += '<option value="Biology and Pharmacology"/>'
        listOptions += '<option value="Biomedical discovery and Commercialization"/>'
        listOptions += '<option value="Business"/>'
        listOptions += '<option value="Chemical and Physical Sciences"/>'
        listOptions += '<option value="Commerce"/>'
        listOptions += '<option value="Computer Science"/>'
        listOptions += '<option value="Economics"/>'
        listOptions += '<option value="Economics"/>'
        listOptions += '<option value="Engineering"/>'
        listOptions += '<option value="Environmental and Earth Sciences"/>'
        listOptions += '<option value="Health and Society"/>'
        listOptions += '<option value="Health Science"/>'
        listOptions += '<option value="Humanities"/>'
        listOptions += '<option value="Integrated Biomedical and Health Sciences"/>'
        listOptions += '<option value="Integrated Business and Humanities"/>'
        listOptions += '<option value="Kinesiology"/>'
        listOptions += '<option value="Life sciences"/>'
        listOptions += '<option value="Mathematics and Statistics"/>'
        listOptions += '<option value="Medical Radiation"/>'
        listOptions += '<option value="Midwifery"/>'
        listOptions += '<option value="Music"/>'
        listOptions += '<option value="Nursing"/>'
        listOptions += '<option value="Physical Assistant"/>'
        listOptions += '<option value="Social Science"/>'
        listOptions += '<option value="Studio Arts"/>'

        programList.innerHTML = listOptions
      }


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

  var selectedFaculty = document.getElementById("faculty").value;
  var selectedProgram = document.getElementById("program").value;
  var graduatingYear = document.getElementById("year").value;

  // no validation on the faculty or program selected since they can leave it blank if they want
  // send post or patch request to db here to update the faculty and program of user
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
});
