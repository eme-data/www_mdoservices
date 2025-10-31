import React from "react"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"

export default function MentionsLegales() {
  return (
    <TekupPageLayout>
      <Helmet>
        <title>Mentions Légales - MDO SERVICES</title>
        <meta name="description" content="Consultez les mentions légales de MDO SERVICES. Informations sur l'éditeur du site, l'hébergement et la propriété intellectuelle." />
        <link rel="canonical" href="https://mdoservices.fr/mentions-legales" />
      </Helmet>
      <div className="container mx-auto px-4 py-16 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Mentions Légales</h1>

          <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">1. Éditeur du site</h2>
              <p>Le site mdoservices.fr est édité par :</p>
              <p>MDO SERVICES, SARL (Société à Responsabilité Limitée)</p>
              <p>Dirigeant : Mathieu D'OLIVEIRA</p>
              <p>Siège social : 27 rue pierre Mazaud, 09200 Saint-Girons, France</p>
              <p>Numéro SIRET : 51409907600028</p>
              <p>Adresse e-mail : contact@mdoservices.fr</p>
              <p>Téléphone : +33 5 82 95 22 77</p>
              <p>Mobile : +33 6 66 03 03 61</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">2. Directeur de la publication</h2>
              <p>Le directeur de la publication est Monsieur Mathieu D'OLIVEIRA.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">3. Hébergement</h2>
              <p>Le site mdoservices.fr est hébergé par :</p>
              <p>Hostinger International Ltd.</p>
              <p>Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
              <p>Site web : www.hostinger.fr</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">4. Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
              <p>
                Les marques citées sur ce site sont déposées par les sociétés qui en sont propriétaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">5. Données personnelles</h2>
              <p>
                Les informations recueillies font l’objet d’un traitement informatique destiné à la gestion des demandes de contact et des relations commerciales.
                Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous bénéficiez d’un droit d’accès, de rectification, de suppression et d’opposition aux informations qui vous concernent.
              </p>
              <p>
                Pour exercer ces droits, veuillez consulter notre <a href="/politique-confidentialite" className="text-blue-600 hover:underline">Politique de Confidentialité</a> ou nous contacter à l'adresse contact@mdoservices.fr.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">6. Cookies</h2>
              <p>
                Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visites. Pour plus d'informations sur l'utilisation des cookies, veuillez consulter notre <a href="/politique-confidentialite#cookies" className="text-blue-600 hover:underline">Politique de Confidentialité</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">7. Limitation de responsabilité</h2>
              <p>
                MDO SERVICES s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, MDO SERVICES ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
              </p>
              <p>
                En conséquence, MDO SERVICES décline toute responsabilité pour toute interruption du site, problèmes techniques, pour toute inexactitude ou omission sur des informations disponibles sur le site, pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site.
              </p>
            </section>
             <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">8. Date de dernière mise à jour</h2>
              <p>16 Mai 2024</p>
            </section>
          </div>
        </motion.div>
      </div>
    </TekupPageLayout>
  )
}