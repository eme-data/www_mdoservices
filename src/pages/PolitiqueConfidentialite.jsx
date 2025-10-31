import React from "react"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"

export default function PolitiqueConfidentialite() {
  return (
    <TekupPageLayout>
      <Helmet>
        <title>Politique de Confidentialité - MDO SERVICES</title>
        <meta name="description" content="Découvrez comment MDO SERVICES collecte, utilise et protège vos données personnelles. Informations conformes au RGPD." />
        <link rel="canonical" href="https://mdoservices.fr/politique-confidentialite" />
      </Helmet>
      <div className="container mx-auto px-4 py-16 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Politique de Confidentialité</h1>

          <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 text-gray-700">
            <p className="italic">Dernière mise à jour : 16 Mai 2024</p>

            <p>
              MDO SERVICES (ci-après "nous", "notre" ou "nos") s'engage à protéger la vie privée des utilisateurs (ci-après "vous" ou "votre") de son site web mdoservices.fr (ci-après le "Site"). Cette Politique de Confidentialité décrit comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles.
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">1. Collecte des informations personnelles</h2>
              <p>Nous pouvons collecter les types d'informations personnelles suivants :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  <strong>Informations d'identification :</strong> nom, prénom, adresse e-mail, numéro de téléphone, adresse postale.
                </li>
                <li>
                  <strong>Informations de connexion :</strong> adresse IP, type de navigateur, pages visitées, durée de la visite, logs serveur.
                </li>
                <li>
                  <strong>Informations fournies volontairement :</strong> informations que vous nous communiquez via les formulaires de contact, demandes de devis, ou lors de vos échanges avec nous.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">2. Utilisation des informations personnelles</h2>
              <p>Nous utilisons vos informations personnelles pour les finalités suivantes :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Fournir et gérer nos services.</li>
                <li>Répondre à vos demandes et questions.</li>
                <li>Améliorer notre Site et nos services.</li>
                <li>Vous envoyer des communications marketing (avec votre consentement préalable).</li>
                <li>Respecter nos obligations légales et réglementaires.</li>
                <li>Assurer la sécurité de notre Site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">3. Partage des informations personnelles</h2>
              <p>Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers à des fins commerciales, sauf dans les cas suivants :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Avec nos prestataires de services qui nous aident à exploiter notre Site et à fournir nos services (par exemple, hébergement, analyse de données). Ces prestataires sont tenus de protéger vos informations.</li>
                <li>Si la loi l'exige ou dans le cadre d'une procédure judiciaire.</li>
                <li>Pour protéger nos droits, notre propriété ou notre sécurité, ainsi que ceux de nos utilisateurs ou du public.</li>
              </ul>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">4. Cookies et technologies similaires</h2>
              <p>
                Notre Site utilise des cookies pour améliorer votre expérience de navigation, analyser l'utilisation du Site et à des fins de marketing. Les cookies sont de petits fichiers texte stockés sur votre appareil.
              </p>
              <p>Types de cookies utilisés :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du Site.</li>
                <li><strong>Cookies de performance/analyse :</strong> nous aident à comprendre comment les visiteurs interagissent avec le Site (par exemple, Google Analytics).</li>
                <li><strong>Cookies de fonctionnalité :</strong> permettent de mémoriser vos préférences.</li>
                <li><strong>Cookies de ciblage/publicité :</strong> utilisés pour vous proposer des publicités pertinentes (nous n'utilisons pas actuellement ce type de cookies de manière intrusive).</li>
              </ul>
              <p>
                Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur ou via notre bannière de consentement aux cookies. Le refus de certains cookies peut affecter votre expérience sur le Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">5. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles contre l'accès non autorisé, la divulgation, l'altération ou la destruction. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est sûre à 100%.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">6. Vos droits</h2>
              <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi "Informatique et Libertés", vous disposez des droits suivants concernant vos informations personnelles :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Droit d'accès.</li>
                <li>Droit de rectification.</li>
                <li>Droit à l'effacement (droit à l'oubli).</li>
                <li>Droit à la limitation du traitement.</li>
                <li>Droit à la portabilité des données.</li>
                <li>Droit d'opposition.</li>
                <li>Droit de retirer votre consentement à tout moment (pour les traitements basés sur le consentement).</li>
                <li>Droit d'introduire une réclamation auprès d'une autorité de contrôle (par exemple, la CNIL en France).</li>
              </ul>
              <p>Pour exercer ces droits, veuillez nous contacter à l'adresse contact@mdoservices.fr.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">7. Conservation des données</h2>
              <p>
                Nous conservons vos informations personnelles aussi longtemps que nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées, y compris pour satisfaire à toute exigence légale, comptable ou en matière de reporting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">8. Liens vers des sites tiers</h2>
              <p>
                Notre Site peut contenir des liens vers des sites web de tiers. Cette Politique de Confidentialité ne s'applique pas à ces sites. Nous vous encourageons à lire les politiques de confidentialité de ces sites tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">9. Modifications de cette Politique de Confidentialité</h2>
              <p>
                Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle politique sur cette page et en mettant à jour la date de "Dernière mise à jour".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">10. Nous contacter</h2>
              <p>
                Si vous avez des questions concernant cette Politique de Confidentialité ou nos pratiques en matière de protection des données, veuillez nous contacter à :
              </p>
              <p>MDO SERVICES</p>
              <p>27 rue pierre Mazaud, 09200 Saint-Girons, France</p>
              <p>Email : contact@mdoservices.fr</p>
            </section>
          </div>
        </motion.div>
      </div>
    </TekupPageLayout>
  )
}