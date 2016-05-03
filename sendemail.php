<?php
# request sent using HTTP_X_REQUESTED_WITH
if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ){
	if (isset($_POST['name']) AND isset($_POST['email']) AND isset($_POST['subject']) AND isset($_POST['message'])) {
		$to = 'martinpielvitori@gmail.com';  // Change it by your email address
    $subject='';
		$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
		$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
		$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    $subject .= filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
		$sent = email($to, $email, $name, $subject, $message);
		if ($sent) {
			echo "<div class='content-message'> <i class='fa fa-rocket fa-3x'></i> <h2>Email Sent Successfully</h2> <p>Your message has been submitted.</p> </div>";
		} else {
			echo "<div class='content-message'> <i class='fa fa-times fa-3x'></i> <h2>Error sending</h2> <p>Try again later.</p> </div>";
		}
	}
	else {
		echo 'All Fields are required';
	}
	return;
}

/**
 * email function
 *
 * @return bool | void
 **/
function email($to, $from_mail, $from_name, $subject, $message){
	$header = array();
	$header[] = "MIME-Version: 1.0";
	$header[] = "From: {$from_name}<{$from_mail}>";
	/* Set message content type HTML*/
	$header[] = "Content-type:text/html; charset=iso-8859-1";
	$header[] = "Content-Transfer-Encoding: 7bit";
	if( mail($to, $subject, $message, implode("\r\n", $header)) ) return true; 
}
?>