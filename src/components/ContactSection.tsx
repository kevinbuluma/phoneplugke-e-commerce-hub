import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Map + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="glass-card overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.277444357954!2d36.8167!3d-1.2864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d664abc1a3%3A0x4cf3e15d5a0e4e3e!2sNairobi%20CBD!5e0!3m2!1sen!2ske!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PhonePlugKE Location"
              />
            </div>
            <div className="flex gap-4">
              <div className="glass-card-subtle p-4 flex-1 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Nairobi CBD</p>
                  <p className="text-xs text-muted-foreground">Kenyatta Avenue</p>
                </div>
              </div>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-subtle p-4 flex items-center gap-3 hover:border-green-500/50 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Chat with us</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                maxLength={100}
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                maxLength={255}
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <textarea
                placeholder="Your Message"
                required
                maxLength={1000}
                rows={4}
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl gradient-bg text-primary-foreground font-semibold flex items-center justify-center gap-2"
              >
                {submitted ? "✅ Sent!" : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
