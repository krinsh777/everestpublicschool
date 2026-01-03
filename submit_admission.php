<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $firstName = $conn->real_escape_string($_POST['firstName']);
    $lastName = $conn->real_escape_string($_POST['lastName']);
    $dob = $conn->real_escape_string($_POST['dob']);
    $gender = $conn->real_escape_string($_POST['gender']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $address = $conn->real_escape_string($_POST['address']);
    $previousSchool = $conn->real_escape_string($_POST['previousSchool']);
    $emisNumber = $conn->real_escape_string($_POST['emisNumber']); // Assuming 'emisNumber' maps to 'emis_number' logic if needed, but keeping variable name simple
    $gpa = $conn->real_escape_string($_POST['gpa']);
    $emergencyName = $conn->real_escape_string($_POST['emergencyName']);
    $emergencyPhone = $conn->real_escape_string($_POST['emergencyPhone']);
    $relationship = $conn->real_escape_string($_POST['relationship']);

    // File Upload Handling
    $targetDir = "uploads/";
    
    // Create uploads directory if it doesn't exist
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    $transcriptPath = "";
    $photoPath = "";

    // Handle Transcript Upload
    if (isset($_FILES["transcript"])) {
        if ($_FILES["transcript"]["error"] == 0) {
            $targetFile = $targetDir . basename($_FILES["transcript"]["name"]);
            $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
            // Simple validation
            if($fileType == "pdf" || $fileType == "doc" || $fileType == "docx") {
                 if (move_uploaded_file($_FILES["transcript"]["tmp_name"], $targetFile)) {
                    $transcriptPath = $targetFile;
                } else {
                    echo "Error moving transcript file.<br>";
                }
            } else {
                echo "Invalid transcript format. Only PDF, DOC, DOCX allowed.<br>";
            }
        } else {
            echo "Transcript upload error code: " . $_FILES["transcript"]["error"] . "<br>";
        }
    }

    // Handle Photo Upload
    if (isset($_FILES["photo"])) {
        if ($_FILES["photo"]["error"] == 0) {
            $targetFile = $targetDir . basename($_FILES["photo"]["name"]);
            $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
            // Simple validation
            if($fileType == "jpg" || $fileType == "png" || $fileType == "jpeg") {
                if (move_uploaded_file($_FILES["photo"]["tmp_name"], $targetFile)) {
                    $photoPath = $targetFile;
                } else {
                    echo "Error moving photo file.<br>";
                }
            } else {
                echo "Invalid photo format. Only JPG, JPEG, PNG allowed.<br>";
            }
        } else {
             echo "Photo upload error code: " . $_FILES["photo"]["error"] . "<br>";
        }
    }

    // SQL Injection Prevention is handled by real_escape_string above normally, 
    // but Prepared Statements are better. Let's use Prepared Statements for the insert.

    $stmt = $conn->prepare("INSERT INTO admission_forms (first_name, last_name, dob, gender, email, phone, address, previous_school, emis_number, gpa, transcript_path, photo_path, emergency_name, emergency_phone, relationship) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->bind_param("sssssssssdsssss", $firstName, $lastName, $dob, $gender, $email, $phone, $address, $previousSchool, $emisNumber, $gpa, $transcriptPath, $photoPath, $emergencyName, $emergencyPhone, $relationship);

    if ($stmt->execute()) {
        echo "<h1>Application Submitted Successfully!</h1>";
        echo "<p>Thank you for applying to Everest Public School.</p>";
        
        if (!empty($photoPath)) {
            // Convert relative system path to URL path for display (hacky but works for this structure)
            // System path: uploads/file.jpg
            // URL from php folder: uploads/file.jpg
            echo "<h3>Uploaded Photo:</h3>";
            echo "<img src='" . $photoPath . "' alt='Student Photo' style='max-width: 300px; border: 1px solid #ccc; padding: 5px;'>";
        }

        echo "<br><br><a href='admission.html'>Go back to form</a>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
