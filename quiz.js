$(document).ready(function() {
  var current = 0; // Current question index
  var score = 0; // Score variable
  var question = $('.question'); // Get all question elements
  var dys = ""; // Result message

  // Hide all questions and buttons initially
  question.hide();
  $('#but').hide();
  $('#Score').hide();
  $('#submit').hide();
  $('#prev').attr('disabled', true);

  // Start button click event
  $("button[name='start']").click(function() {
      $('#First').hide();
      $(question[current]).show(); // Show the first question
      $('#but').show(); // Show navigation buttons
  });

  // Next button click event
  $("#next").click(function() {
      $(question[current]).hide(); // Hide current question
      current++; // Move to next question
      $(question[current]).show(); // Show next question

      // Enable/disable buttons based on the current question
      if (current === question.length - 1) {
          $('#next').attr('disabled', true); // Disable next on last question
          $('#submit').show(); // Show submit button
      }
      $('#prev').attr('disabled', false); // Enable previous button
  });

  // Previous button click event
  $("#prev").click(function() {
      $(question[current]).hide(); // Hide current question
      current--; // Move to previous question
      $(question[current]).show(); // Show previous question

      // Enable/disable buttons based on the current question
      if (current === 0) {
          $('#prev').attr('disabled', true); // Disable previous on first question
      }
      $('#next').attr('disabled', false); // Enable next button
      $('#submit').hide(); // Hide submit button
  });

  // Submit button click event
  $("#submit").click(function() {
      question.hide(); // Hide all questions
      score = 0; // Reset score

      // Calculate score based on selected options
      for (var i = 0; i < question.length; i++) {
          var selectedOption = parseInt($(question[i]).find('input[name="options"]:checked').val());
          if (!isNaN(selectedOption)) {
              score += selectedOption; // Add to score if an option is selected
          }
      }

      // Determine dyslexia diagnosis based on score
      if (score >= 3 && score <= 4) {
          dys = "Your ward shows no signs of learning disability.";
      } else if (score == 5 || score == 6) {
          dys = "Your ward shows some signs of learning disorder.";
      } else if (score >= 7) {
          dys = "It appears that your ward has probable signs of some learning disorder. You should pay special attention.";
      }

      // Display result
      $('#score').text(dys);
      $("#Score").show();
      $('#but').hide();
  });

  // Restart button click event
  $('#restart').click(function() {
      location.reload(); // Reload the page to restart the quiz
  });
});