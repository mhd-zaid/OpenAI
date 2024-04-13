import React from "react";

const ContactPage = () => {
    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
            <p className="mb-4">
                Vous avez des questions, des suggestions ou simplement envie de dire bonjour ? N'hésitez pas
                à nous contacter ! Vous pouvez nous envoyer un email à{" "}
                <a href="mailto:contact@example.com" className="text-indigo-600 hover:underline">
                    contact@example.com
                </a>
                .
            </p>
            <p>
                Notre équipe est là pour vous aider avec tout ce dont vous pourriez avoir besoin. Que ce soit
                pour des demandes d'assistance, des informations supplémentaires sur nos recettes, ou des
                collaborations potentielles, nous sommes disponibles pour répondre à vos questions et vous
                fournir l'assistance nécessaire.
            </p>
            <p>
                Nous nous efforçons de répondre à tous les messages dans les plus brefs délais, généralement
                dans un délai de 24 à 48 heures les jours ouvrables. Votre satisfaction est notre priorité,
                et nous nous engageons à vous offrir une expérience client exceptionnelle.
            </p>
        </div>
    );
};

export default ContactPage;
