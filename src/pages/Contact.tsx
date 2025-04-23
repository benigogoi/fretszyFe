import React, { useState } from "react";
import Button from "../components/common/Button";
import emailjs from "emailjs-com";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear email error when user types in email field
    if (name === "email") {
      setEmailError("");
    }
  };

  const validateEmail = (email: string): boolean => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // More comprehensive email validation regex (RFC 5322 compliant)
    const strictEmailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    if (!strictEmailRegex.test(email)) {
      setEmailError(
        "Please check your email format. Example: name@example.com"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setEmailError("");

    // Validate email before submission
    if (!validateEmail(formState.email)) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare the template parameters
      const templateParams = {
        from_name: "Fretszy-Contact Form",
        reply_to: formState.email,
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message,
        to_email: "support@fretszy.com",
      };

      // Your EmailJS credentials
      const serviceId = "service_t0gx67c";
      const templateId = "template_e75mbn5";
      const userId = "WR3raC70Oqwd00JG8";

      // Send the email
      await emailjs.send(serviceId, templateId, templateParams, userId);

      // Show success message
      setFormSubmitted(true);

      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      setError("Failed to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Real-time email validation on blur
  const handleEmailBlur = () => {
    if (formState.email) {
      validateEmail(formState.email);
    }
  };

  return (
    <div className="pt-8 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="mb-4">
                Have questions about Fretszy? Want to provide feedback or
                suggest new features? We'd love to hear from you! Fill out the
                form and we'll get back to you as soon as possible.
              </p>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-3">Connect With Us</h3>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61574906033043&sk=about_contact_and_basic_info"
                    target="blank"
                    className="text-blue-400 hover:text-blue-300"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            {formSubmitted ? (
              <div className="bg-green-900 bg-opacity-20 p-8 rounded-lg border border-green-700 text-center">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="text-2xl font-bold text-green-400 mb-2">
                  Thank You!
                </h3>
                <p className="text-green-300 mb-6">
                  Your message has been sent successfully. We'll get back to you
                  soon!
                </p>
                <Button
                  variant="success"
                  onClick={() => setFormSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                {error && (
                  <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-600 text-red-300 rounded">
                    {error}
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="name" className="block font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    className={`w-full px-4 py-2 bg-gray-700 border ${
                      emailError ? "border-red-500" : "border-gray-600"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address"
                  />
                  {emailError && (
                    <p className="text-red-400 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block font-medium mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="feedback">Feedback</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting || emailError !== ""}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
