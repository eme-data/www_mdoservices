import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  TrendingUp,
  Award,
  Shield,
  Users,
  Headphones,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  Building,
  User,
  MessageSquare,
  Target,
  Zap,
  Gift,
  BarChart3
} from "lucide-react"

export default function DevenirPartenaire() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
    email: "",
    telephone: "",
    typeActivite: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi (à remplacer par votre API)
    setTimeout(() => {
      toast({
        title: "Candidature envoyée !",
        description: "Nous vous contacterons dans les 48h pour étudier votre candidature.",
      })
      setFormData({
        nom: "",
        prenom: "",
        entreprise: "",
        email: "",
        telephone: "",
        typeActivite: "",
        message: ""
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const avantages = [
    {
      icon: TrendingUp,
      title: "Commissions jusqu'à 15%",
      description: "Profitez de commissions attractives sur toutes vos ventes récurrentes"
    },
    {
      icon: Award,
      title: "Tarifs Préférentiels",
      description: "Accès exclusif à nos meilleurs tarifs pour maximiser vos marges"
    },
    {
      icon: Headphones,
      title: "Support Dédié 24/7",
      description: "Équipe technique dédiée pour vous accompagner et soutenir vos clients"
    },
    {
      icon: Gift,
      title: "Outils Marketing",
      description: "Kit complet de documentation, présentation et supports commerciaux"
    },
    {
      icon: Zap,
      title: "Formation Gratuite",
      description: "Accès à nos formations produits et certifications partenaires"
    },
    {
      icon: BarChart3,
      title: "Portail Partenaire",
      description: "Plateforme sécurisée pour gérer vos devis, commandes et commissions"
    }
  ]

  const profils = [
    {
      icon: Briefcase,
      title: "Revendeurs IT",
      description: "Intégrateurs et revendeurs de solutions informatiques"
    },
    {
      icon: Shield,
      title: "MSSP & Intégrateurs",
      description: "Prestataires de services managés et sécurité"
    },
    {
      icon: Users,
      title: "ESN & Consultants",
      description: "Sociétés de services numériques et consultants indépendants"
    },
    {
      icon: Target,
      title: "Apporteurs d'affaires",
      description: "Prescripteurs et conseillers en transformation digitale"
    }
  ]

  const etapes = [
    {
      numero: "01",
      titre: "Candidature",
      description: "Remplissez le formulaire ci-dessous avec vos informations"
    },
    {
      numero: "02",
      titre: "Validation",
      description: "Notre équipe étudie votre candidature sous 48h"
    },
    {
      numero: "03",
      titre: "Intégration",
      description: "Accès au portail partenaire et formation produits"
    },
    {
      numero: "04",
      titre: "Démarrage",
      description: "Commencez à vendre et générer vos commissions"
    }
  ]

  const faq = [
    {
      question: "Quels sont les critères pour devenir partenaire ?",
      reponse: "Nous recherchons des professionnels IT avec une clientèle existante et une expertise dans les solutions cloud, cybersécurité ou télécommunications."
    },
    {
      question: "Y a-t-il des frais d'inscription ?",
      reponse: "Non, le programme partenaire MDO Services est entièrement gratuit sans frais d'inscription ni engagement minimum."
    },
    {
      question: "Comment sont calculées les commissions ?",
      reponse: "Les commissions varient de 10% à 15% selon le volume de ventes et sont versées mensuellement sur toutes vos transactions récurrentes."
    },
    {
      question: "Puis-je cumuler plusieurs programmes partenaires ?",
      reponse: "Oui, vous pouvez être partenaire sur plusieurs gammes de produits (Microsoft, Google Workspace, Cybersécurité, etc.) et cumuler les avantages."
    }
  ]

  return (
    <TekupPageLayout>
      <Helmet>
        <title>Devenir Partenaire - Programme Partenaires MDO SERVICES</title>
        <meta name="description" content="Rejoignez le programme partenaires MDO Services et bénéficiez de commissions attractives, tarifs préférentiels et support dédié." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30 mb-6">
                Programme Partenaires
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Développez votre activité avec{" "}
              <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                MDO Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl md:text-2xl text-blue-100 mb-8"
            >
              Rejoignez notre réseau de partenaires et bénéficiez de commissions attractives,
              tarifs préférentiels et d'un support dédié.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => document.getElementById('formulaire-partenaire').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl"
              >
                Candidater maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => window.location.href = '/contact'}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl"
              >
                Nous contacter
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            >
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100 text-sm">Partenaires Actifs</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15%</div>
                <div className="text-blue-100 text-sm">Commission Max</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100 text-sm">Support Dédié</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Pourquoi devenir partenaire MDO Services ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Profitez d'un programme complet conçu pour maximiser votre croissance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {avantages.map((avantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <avantage.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{avantage.title}</h3>
                <p className="text-slate-600">{avantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profils Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Qui peut devenir partenaire ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Notre programme s'adresse à tous les professionnels de l'IT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {profils.map((profil, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center border-2 border-blue-100 hover:border-blue-300 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <profil.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{profil.title}</h3>
                <p className="text-sm text-slate-600">{profil.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Étapes Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              4 étapes simples pour rejoindre notre réseau de partenaires
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {etapes.map((etape, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 h-full">
                  <div className="text-5xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {etape.numero}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{etape.titre}</h3>
                  <p className="text-slate-600">{etape.description}</p>
                </div>
                {index < etapes.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire Section */}
      <section id="formulaire-partenaire" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Rejoignez-nous dès aujourd'hui
              </h2>
              <p className="text-xl text-blue-100">
                Remplissez ce formulaire et notre équipe vous contactera sous 48h
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nom" className="text-slate-700 font-medium mb-2 block">
                      Nom *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="nom"
                        name="nom"
                        type="text"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="prenom" className="text-slate-700 font-medium mb-2 block">
                      Prénom *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="prenom"
                        name="prenom"
                        type="text"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="entreprise" className="text-slate-700 font-medium mb-2 block">
                    Entreprise *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="entreprise"
                      name="entreprise"
                      type="text"
                      value={formData.entreprise}
                      onChange={handleChange}
                      required
                      className="pl-10 h-12"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-medium mb-2 block">
                      Email professionnel *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="telephone" className="text-slate-700 font-medium mb-2 block">
                      Téléphone *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="typeActivite" className="text-slate-700 font-medium mb-2 block">
                    Type d'activité *
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="typeActivite"
                      name="typeActivite"
                      type="text"
                      value={formData.typeActivite}
                      onChange={handleChange}
                      required
                      className="pl-10 h-12"
                      placeholder="Ex: Revendeur IT, ESN, Consultant..."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-700 font-medium mb-2 block">
                    Parlez-nous de votre projet
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="pl-10"
                      placeholder="Décrivez brièvement votre activité et votre intérêt pour notre programme partenaire..."
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Envoyer ma candidature
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </Button>

                <p className="text-sm text-slate-500 text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par MDO Services concernant notre programme partenaire.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tout ce que vous devez savoir sur notre programme partenaire
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
              >
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{item.question}</h3>
                    <p className="text-slate-600">{item.reponse}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à développer votre activité ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez dès maintenant plus de 50 partenaires qui font confiance à MDO Services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => document.getElementById('formulaire-partenaire').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl"
            >
              Postuler maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => window.location.href = '/contact'}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl"
            >
              Poser une question
            </Button>
          </div>
        </div>
      </section>
    </TekupPageLayout>
  )
}
