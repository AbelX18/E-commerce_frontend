import { motion } from 'framer-motion';
import { features } from '../data/about';
import { contactInfo } from '../data/contact';
import { clsx } from 'clsx';
import { ThemeContext } from '../context/ThemeProvider';
import { useContext } from 'react';

const About = () => {
  const { darkMode } = useContext(ThemeContext);

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
          className={clsx(
            "bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-12 transition-colors",
            darkMode ? "shadow-lg shadow-red-900/30" : "shadow-lg shadow-blue-900/20"
          )}
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
          className={clsx(
            "bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-12 transition-colors",
            darkMode ? "shadow-lg shadow-red-900/30" : "shadow-lg shadow-blue-900/20"
          )}
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
              <div 
                key={index} 
                className={clsx(
                  "text-center p-4 rounded-lg transition-all",
                  darkMode ? "hover:shadow-md hover:shadow-red-900/40" : "hover:shadow-md hover:shadow-blue-900/30"
                )}
              >
                <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto mb-4 overflow-hidden shadow-inner">
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
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-lg p-8 transition-colors",
            darkMode ? "shadow-lg shadow-red-900/30" : "shadow-lg shadow-blue-900/20"
          )}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contáctanos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Info de contacto</h3>
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex items-center rounded-lg transition-all duration-300",
                      "hover:shadow-md hover:-translate-y-1",
                      darkMode 
                        ? "hover:shadow-red-900/40 bg-gray-700/30 hover:bg-gray-700/50" 
                        : "hover:shadow-blue-900/30 bg-gray-100 hover:bg-gray-200",
                      "border border-transparent hover:border-opacity-30",
                      darkMode ? "hover:border-red-500" : "hover:border-blue-500"
                    )}
                  >
                    <div className={clsx(
                      "p-2 rounded-full mr-3",
                      darkMode ? "bg-red-900/30 text-red-400" : "bg-blue-100 text-blue-600"
                    )}>
                      {item.icon}
                    </div>
                    <p className={clsx(
                      "text-medium",
                      darkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Horario de atención</h3>
              <div className="space-y-3">
                {[
                  "Lunes - Viernes: 9:00 AM - 9:00 PM",
                  "Sábados: 7:00 AM - 10:00 PM",
                  "Domingos: Cerrado"
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "p-2 rounded-lg transition-all duration-300",
                      "hover:shadow-md hover:-translate-y-1",
                      darkMode 
                        ? "hover:shadow-red-900/40 bg-gray-700/30 hover:bg-gray-700/50" 
                        : "hover:shadow-blue-900/30 bg-gray-100 hover:bg-gray-200",
                      "border border-transparent hover:border-opacity-30",
                      darkMode ? "hover:border-red-500" : "hover:border-blue-500"
                    )}
                  >
                    <p className={clsx(
                      "flex items-center",
                      darkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      <span className={clsx(
                        "inline-block w-2 h-2 rounded-full mr-3",
                        darkMode ? "bg-red-500" : "bg-blue-500"
                      )} />
                      {schedule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;