import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Check, AlertCircle, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    photos: null
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { success: boolean; message: string }>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, photos: e.target.files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_USER_ID
      );
      
      setStatus({
        success: true,
        message: 'Your message has been sent! We\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        photos: null
      });
      
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({
        success: false,
        message: 'There was an error sending your message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our services or need a custom solution? 
            Get in touch with us and we'll be happy to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Phone className="text-blue-600 mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">416-269-1305</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-blue-600 mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">info@elitedetailing.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Instagram className="text-blue-600 mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-semibold">Instagram</h4>
                  <a href="https://www.instagram.com/elite_detailing_l6/" className="text-gray-600 hover:text-blue-600 transition-colors">
                    @elite_detailing_l6
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Business Hours</h4>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1 pr-4 font-medium">Monday - Friday</td>
                    <td className="py-1">8:00 AM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-medium">Saturday</td>
                    <td className="py-1">9:00 AM - 4:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-medium">Sunday</td>
                    <td className="py-1">Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="form-control"
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="photos" className="form-label">Upload Photos (optional)</label>
                <input
                  type="file"
                  id="photos"
                  name="photos"
                  onChange={handleFileChange}
                  className="form-control pt-1.5"
                  accept="image/*"
                  multiple
                />
                <p className="text-sm text-gray-500 mt-1">
                  For custom services, paint correction, or ceramic coating consultations, 
                  please upload photos of your vehicle.
                </p>
              </div>
              
              {status && (
                <div 
                  className={`p-4 rounded-md ${
                    status.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  <div className="flex items-center">
                    {status.success ? (
                      <Check size={20} className="mr-2" />
                    ) : (
                      <AlertCircle size={20} className="mr-2" />
                    )}
                    <p>{status.message}</p>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;