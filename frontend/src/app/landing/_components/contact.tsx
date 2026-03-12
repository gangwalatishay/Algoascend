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
import { useState } from "react"
import axios from "axios"

const courses = [
  "Programming with Python – Beginner to Advanced",
  "Data Structures & Algorithms Mastery",
  "System Design Fundamentals",
  "Git, Linux & Developer Tools Bootcamp",
  "Java Full Stack Development Program",
  "Backend Engineering with Spring Boot",
  "Frontend Engineering with React",
  "REST API & Microservices Development",
  "DevOps & Cloud Deployment (Docker + AWS)",
  "Data Analytics Professional Program",
  "SQL for Data Professionals",
  "Machine Learning Engineering Program",
  "Deep Learning & Computer Vision",
  "Generative AI Engineering Program",
  "Agentic AI",
  "FAANG Interview Preparation (DSA + System Design)",
]

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post("http://127.0.0.1:5000/api/contact", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        topic: formData.topic,
        message: formData.message,
      })
      setSuccess(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        topic: "",
        message: "",
      })
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      alert("Failed to send request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-20">
      <div className="flex flex-col mb-20 justify-center items-center">
        <h2 className="text-4xl font-bold">
          Ready to Start Your Coding Journey?
        </h2>
        <p className="max-w-150 mt-10 text-center">
          Join AlgoAscend today and transform your programming skills with our industry-aligned curriculum and expert instructors.
        </p>
      </div>
      <div className="contact-container">
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
          <form onSubmit={handleSubmit} className="formBox">
            <div className="inputBox w50">
              <Input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <span>
                First Name
              </span>
            </div>
            <div className="inputBox w50">
              <Input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              <span>
                Last Name
              </span>
            </div>
            <div className="inputBox w50">
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <span>
                Email Address
              </span>
            </div>
            <div className="inputBox w50">
              <Input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <span>
                Mobile Number
              </span>
            </div>
            <Select
              value={formData.topic}
              onValueChange={(value) => setFormData({ ...formData, topic: value })}
            >
              <SelectTrigger className="w-full max-w-180 relative z-10">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectGroup>
                  <SelectLabel>Courses</SelectLabel>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="inputBox w100">
              <Textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <span className="bottom-10">
                Write your message here...
              </span>
            </div>
            <div className="inputBox w100">
              {success && (
                <div className="text-green-600 text-center mb-4">
                  Request sent successfully!
                </div>
              )}
              <Button
                type="submit"
                className="w-full mt-10"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}