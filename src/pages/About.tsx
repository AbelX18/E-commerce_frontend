import { motion } from 'framer-motion';
import { features } from '../data/about';
import { contactInfo } from '../data/contact';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-[#111014] py-12 transition-colors">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Acerca de nosotros</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tienda especializada en Cómics, Mangas, Merchandising y mucho más!!. Amamos lo que hacemos ❤
          </p>
        </motion.div>

        {/* La misión */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 transition-colors"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nuestro objetivo</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${item.bgColor}`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ELTEAM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 transition-colors"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Nuestro equipo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Abel Campana", role: "CEO y Fundador", img: "src/test/Dynas_Shocked.PNG" },
              { name: "Pablo Rojas", role: "Contador", img: "src/test/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" },
              { name: "Jorge Rodriguez", role: "Dueño de la marca", img: "src/test/f59363424.jpg" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto mb-4 overflow-hidden">
                  <img
                    src={member.img}
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contáctanos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Info de contacto</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <p key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    {item.icon}
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Horario de atención</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Lunes - Viernes: 9:00 AM - 9:00 PM</p>
                <p>Sábados: 7:00 AM - 10:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 