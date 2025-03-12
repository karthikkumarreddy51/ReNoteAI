// ...existing code...
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  try {
    // ...existing code...
  } catch (error: any) {
    // Log a sanitized error message if a known authentication issue is detected
    if (
      error.message &&
      (error.message.includes("SMTP Configuration Error") ||
       error.message.includes("Invalid login") ||
       error.message.includes("Username and Password not accepted"))
    ) {
      console.error("Submission error: Email authentication failure.");
      alert("Submission failed due to email configuration error. Please contact support.");
    } else {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again later.");
    }
  }
}
// ...existing code...