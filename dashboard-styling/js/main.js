$(".sidebar-dropdown > a").click(function () {
  $(".sidebar-submenu").slideUp(200);
  if ($(this).parent().hasClass("active")) {
    $(".sidebar-dropdown").removeClass("active");
    $(this).parent().removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this).next(".sidebar-submenu").slideDown(200);
    $(this).parent().addClass("active");
  }
});

$("#close-sidebar").click(function () {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function () {
  $(".page-wrapper").addClass("toggled");
});

/*window.onbeforeunload = closingCode();

function closingCode() {
  window.location.replace("/users/login");
  /*
  const rawResponse = fetch("/users/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => response.json());
  return "hiii";
  
  return null;
}
*/

$(window).on("beforeunload", function () {
  return "Your own message goes here...";
});
