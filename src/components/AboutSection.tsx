import { motion } from "framer-motion";
import { MapPin, Truck, Shield, Star } from "lucide-react";

const AboutSection = () => {
  const features = [
    { icon: <MapPin className="w-6 h-6" />, title: "Nairobi Based", desc: "Located at The Baazar, Moi Avenue" },
    { icon: <Truck className="w-6 h-6" />, title: "Fast Delivery", desc: "Same-day delivery within Nairobi" },
    { icon: <Shield className="w-6 h-6" />, title: "Warranty", desc: "All products come with warranty" },
    { icon: <Star className="w-6 h-6" />, title: "Trusted", desc: "5,000+ happy customers across Kenya" },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Your Trusted <span className="gradient-text">Tech Plug</span> in Nairobi
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                PhonePlugKE is Nairobi's premier destination for smartphones and accessories.
                We source directly from authorized distributors to bring you genuine products
                at the best prices. From the latest iPhones to budget-friendly Tecno and Infinix phones,
                we've got something for everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With fast delivery across Kenya and a dedicated support team, shopping with
                PhonePlugKE is always a smooth experience. Visit us at The Baazar, Moi Avenue
                or order online — we've got you covered! 🇰🇪
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-subtle p-5 text-center"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3 text-primary-foreground">
                    {f.icon}
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
