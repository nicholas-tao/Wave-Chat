  //function which runs when DOM is ready i.e. upon page start - populates the faculty dropdown list
  $(document).ready(populateDropdowns())




  function populateDropdowns(){

    var loadFaculty
    var loadProgram
    var loadYear
  
    var faculty = document.getElementById('faculty')
    var programs = document.getElementById('program')
    var year = document.getElementById('year')

    const rawResponse = fetch('/dashboard/load/profile', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json())
        .then(data => {
          console.log(data)
          loadFaculty = data['faculty']
          loadProgram = data['program']
          loadYear = data['year']
          console.log(loadFaculty)
          console.log(loadProgram)
          console.log(loadYear)
          console.log('hi123456789');
           let sfaculty = loadFaculty.toString()
          // faculty.value = sfaculty

           let sprograms = loadProgram.toString()
          // programs.value = sprograms

           let syear = loadYear.toString()
          // graduatingYear.value = syear
          // programs.options[0] = loadProgram
          // year.options[0] = loadYear




          if(sfaculty =="No Faculty Entered"){
            console.log("nullllllll")
          faculty.options[0] = new Option('--Select--', "none") /*Option(text, value, defaultSelected, selected)*/
          }
          else{
            faculty.options[0] = new Option(sfaculty) /*Option(text, value, defaultSelected, selected)*/
          }
          faculty.options[1] = new Option('Faculty of Applied Health Sciences', "Faculty of Applied Health Sciences")
          faculty.options[2] = new Option('Faculty of Arts', "Faculty of Arts")
          faculty.options[3] = new Option('Faculty of Engineering', "Faculty of Engineering")
          faculty.options[4] = new Option('Faculty of Environment', "Faculty of Environment")
          faculty.options[5] = new Option('Faculty of Mathematics', "Faculty of Mathematics")
          faculty.options[6] = new Option('Faculty of Science', "Faculty of Science")
      
      
          programs.options.length = 0
          if(sprograms=="No Program Entered"){
          programs.options[0] = new Option("--Select a Faculty--", "none")
          }
          else{
            programs.options[0] = new Option(sprograms);

          }
        
      
        //function which checks which faculty is selected and populates program dropdown accordingly
        $('select[name="faculty"]').change(function (){
          
          var programs = document.getElementById('program')
      
          var selectedFaculty = $(this).val()
      
          if(selectedFaculty == "Faculty of Applied Health Sciences"){
      
            programs.options.length = 0
            programs.options[0] = new Option("--Select a Program--")
            programs.options[1] = new Option("Health Studies", "Health Studies")
            programs.options[2] = new Option("Kinesiology", "Kinesiology")
            programs.options[3] = new Option("Public Health", "Public Health")
            programs.options[4] = new Option("Recreation and Leisure Studies", "Recreation and Leisure Studies")
      
          } else if(selectedFaculty == "Faculty of Arts"){
      
            programs.options.length = 0
            programs.options[0] = new Option("--Select a Program--")
            programs.options[1] = new Option("Honours Arts", "Honours Arts")
            programs.options[2] = new Option("Honours Arts and Business", "Honours Arts and Business")
            programs.options[3] = new Option("Global Business and Digital Arts", "Global Business and Digital Arts")
            programs.options[4] = new Option("Social Development Studies", "Social Development Studies")
            programs.options[5] = new Option("Accounting and Financial Management", "Accounting and Financial Management")
            programs.options[6] = new Option("Computing and Financial Management", "Computing and Financial Management")
      
      
          } else if(selectedFaculty == "Faculty of Engineering"){
            console.log("engineer")
            programs.options.length = 0
            programs.options[0] = new Option("--Select a Program--")
            programs.options[1] = new Option("Architectural Engineering", "Architectural Engineering")
            programs.options[2] = new Option("Architecture", "Architecture")
            programs.options[3] = new Option("Biomedical Engineering", "Biomedical Engineering")
            programs.options[4] = new Option("Chemical Engineering", "Chemical Engineering")
            programs.options[5] = new Option("Civil Engineering", "Civil Engineering")
            programs.options[6] = new Option("Computer Engineering", "Computer Engineering")
            programs.options[7] = new Option("Electrical Engineering", "Electrical Engineering")
            programs.options[8] = new Option("Environmental Engineering", "Environmental Engineering")
            programs.options[9] = new Option("Geological Engineering", "Geological Engineering")
            programs.options[10] = new Option("Management Engineering", "Management Engineering")
            programs.options[11] = new Option("Mechanical Engineering", "Mechanical Engineering")
            programs.options[12] = new Option("Mechatronics Engineering", "Mechatronics Engineering")
            programs.options[13] = new Option("Nanotechnology Engineering", "Nanotechnology Engineering")
            programs.options[14] = new Option("Software Engineering", "Software Engineering")
            programs.options[15] = new Option("Systems Design Engineering", "Systems Design Engineering")
      
      
          } else if(selectedFaculty == "Faculty of Environment"){
      
            programs.options.length = 0
            programs.options[0] = new Option("--Select a Program--")
            programs.options[1] = new Option("Environment and Business", "Environment and Business")
            programs.options[2] = new Option("Environment, Resources and Sustainability", "Environment, Resources and Sustainability")
            programs.options[3] = new Option("Geography and Aviation", "Geography and Aviation")
            programs.options[4] = new Option("Geography and Environmental Management", "Geography and Environmental Management")
            programs.options[5] = new Option("Geomatics", "Geomatics")
            programs.options[6] = new Option("International Development", "International Development")
            programs.options[7] = new Option("Knowledge Integration", "Knowledge Integration")
            programs.options[8] = new Option("Planning", "Planning")
      
          } else if(selectedFaculty == "Faculty of Mathematics"){
      
            programs.options.length = 0
            programs.options[0] = new Option("--Select a Program--")
            programs.options[1] = new Option("Business Administration and Computer Science Double Degree", "Business Administration and Computer Science Double Degree")
            programs.options[2] = new Option("Business Administration and Mathematics Double Degree", "Business Administration and Mathematics Double Degree")
            programs.options[3] = new Option("Computer Science", "Computer Science")
            programs.options[4] = new Option("Computing and Financial Management", "Computing and Financial Management")
            programs.options[5] = new Option("Honours Mathematics", "Honours Mathematics")
            programs.options[6] = new Option("Mathematics/Business Administration", "Mathematics/Business Administration")
            programs.options[7] = new Option("Mathematics/Chartered Professional Accountancy", "Mathematics/Chartered Professional Accountancy")
            programs.options[8] = new Option("Mathematics/Financial Analysis and Risk Management", "Mathematics/Financial Analysis and Risk Management")
      
      
          } else if(selectedFaculty == "Faculty of Science"){
      
            programs.options.length = 0
            programs.options[0] = new Option("--Select a Program--")
            programs.options[1] = new Option("Biochemistry", "Biochemistry")
            programs.options[2] = new Option("Biology", "Biology")
            programs.options[3] = new Option("Biotechnology/Chartered Professional Accountancy", "Biotechnology/Chartered Professional Accountancy")
            programs.options[4] = new Option("Biotechnology/Economics", "Biotechnology/Economics")
            programs.options[5] = new Option("Chemistry", "Chemistry")
            programs.options[6] = new Option("Conditional Admission to Pharmacy", "Conditional Admission to Pharmacy")
            programs.options[7] = new Option("Earth Sciences", "Earth Sciences")
            programs.options[8] = new Option("Environmental Science", "Environmental Science")
            programs.options[9] = new Option("Honours Science", "Honours Science")
            programs.options[10] = new Option("Life Physics", "Life Physics")
            programs.options[11] = new Option("Materials and Nanosciences", "Materials and Nanosciences")
            programs.options[12] = new Option("Mathematical Physics", "Mathematical Physics")
            programs.options[13] = new Option("Medicinal Chemistry", "Medicinal Chemistry")
            programs.options[14] = new Option("Physics", "Physics")
            programs.options[15] = new Option("Physics and Astronomy", "Physics and Astronomy")
            programs.options[16] = new Option("Psychology", "Psychology")
            programs.options[17] = new Option("Science and Aviation", "Science and Aviation")
            programs.options[18] = new Option("Science and Business", "Science and Business")
      
      
          } else {
      
            programs.options.length = 0
            programs.options[0] = new Option("--Select a Faculty--", "none")
      
          } 
      
        })

        if(syear=="0"){
          year.options[0] = new Option("2020")
        }
        else{
          year.options[0] = new Option(syear);
        }

        year.options[1] = new Option("2021")
        year.options[2] = new Option("2022")
        year.options[3] = new Option("2023")
        year.options[4] = new Option("2024")
        year.options[5] = new Option("2025")

        })
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

   
  


  $("#save").click(function() {

    // var selectedFaculty = $('select[id="faculty"]').val
    // var selectedProgram = $('select[id="program"]').val

    var selectedFaculty = document.getElementById('faculty').value
    var selectedProgram = document.getElementById('program').value
    var graduatingYear = document.getElementById('year').value


    // no validation on the faculty or program selected since they can leave it blank if they want
    // send post or patch request to db here to update the faculty and program of user
    reqBody = {
      fac: selectedFaculty,
      prog: selectedProgram,
      year: graduatingYear
    }
    const rawResponse = fetch('/dashboard/profile', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
        }).then(response => console.log(response));
        console.log("request sent")
    
    alert("Information Saved!")
    location.href = "/dashboard/home"

  })


