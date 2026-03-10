import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange =
    (field: "firstName" | "lastName" | "email" | "phone" | "message") =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      await axios.post("http://127.0.0.1:5000/api/contact", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        topic: form.topic,
        message: form.message,
      });

      setSuccess("Thank you for reaching out. We will contact you soon.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        topic: "",
        message: "",
      });
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.errors?.[0]?.msg ||
        "Failed to send your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-20 px-4 md:px-8">
      <div className="flex flex-col mb-12 md:mb-20 justify-center items-center max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Start Your Coding Journey?
        </h2>
        <p className="mt-6 md:mt-10">
          Join AlgoAscend today and transform your programming skills with our industry-aligned curriculum and expert instructors.
        </p>
      </div>
      <div className="contact-container w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="contactInfo">
          <h2>
            Contact Info
          </h2>
          <ul className="info">
            <li>
              <span>
                <MapPin />
              </span>
              <span></span>
            </li>
            <li>
              <span>
                <Mail />
              </span>
              <span>
                info@algoascend.in
              </span>
            </li>
            <li>
              <span>
                <Phone />
              </span>
              <span>
                +91 88733 68527
              </span>
            </li>
          </ul>
        </div>
        <div className="contactForm">
          <h2>
            Send a Request
          </h2>
          {success && (
            <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium text-center">
              {error}
            </div>
          )}
          <form className="formBox" onSubmit={handleSubmit}>
            <div className="inputBox w50">
              <Input
                type="text"
                required
                value={form.firstName}
                onChange={handleChange("firstName")}
              />
              <span>
                First Name
              </span>
            </div>
            <div className="inputBox w50">
              <Input
                type="text"
                required
                value={form.lastName}
                onChange={handleChange("lastName")}
              />
              <span>
                Last Name
              </span>
            </div>
            <div className="inputBox w50">
              <Input
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
              />
              <span>
                Email Address
              </span>
            </div>
            <div className="inputBox w50">
              <Input
                type="text"
                required
                value={form.phone}
                onChange={handleChange("phone")}
              />
              <span>
                Mobile Number
              </span>
            </div>
            <Select
              value={form.topic}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, topic: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select what you are interested in" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Topic</SelectLabel>
                  <SelectItem value="courses">Courses</SelectItem>
                  <SelectItem value="mentorship">Mentorship</SelectItem>
                  <SelectItem value="corporate-training">Corporate Training</SelectItem>
                  <SelectItem value="partnerships">Partnerships</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="inputBox w100">
              <Textarea
                required
                value={form.message}
                onChange={handleChange("message")}
              />
              <span className="bottom-10">
                Write your message here...
              </span>
            </div>
            <div className="inputBox w100">
              <Button
                className="w-full mt-10"
                type="submit"
                disabled={
                  submitting ||
                  !form.firstName ||
                  !form.lastName ||
                  !form.email ||
                  !form.phone ||
                  !form.topic ||
                  !form.message
                }
              >
                {submitting ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
