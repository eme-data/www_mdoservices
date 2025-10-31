import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { TekupPageLayout } from '@/components/layout/TekupPageLayout';

const SuccessPage = () => {
  return (
    <TekupPageLayout>
      <Helmet>
        <title>Paiement Réussi - MDO SERVICES</title>
        <meta name="description" content="Confirmation de votre commande. Merci pour votre achat !" />
      </Helmet>
      <div className="pt-24 bg-slate-900 text-white min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="glass-card max-w-2xl mx-auto p-8 md:p-12 rounded-2xl shadow-2xl"
          >
            <CheckCircle className="h-24 w-24 text-green-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Merci pour votre commande !
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Votre paiement a été traité avec succès. Vous recevrez bientôt un e-mail de confirmation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold">
                <Link to="/store">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Continuer vos achats
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Link to="/">
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </TekupPageLayout>
  );
};

export default SuccessPage;