import PropTypes from 'prop-types';

const CardComponent = ({ title, children, withHeader, className, backgroundImage }) => {
    const cardClassName = "w-full sm:w-2/3 md:w-1/2 lg:w-2/5 w-4/5 bg-white mx-auto rounded-2xl container";
    const headerClassName = "relative top-0 bg-gray-800 text-white w-full py-8 sm:py-2 md:py-2 lg:py-4 xl:py-4 p-5 rounded-t-2xl mb-16";

    const cardStyle = {
        backgroundImage: `url("C:/Users/makan/ESGI/5iw/Intégration AI/OpenAI/client/public/img/login-bg.jpg")`,
        backgroundSize: 'cover', // ou 'contain' selon vos besoins
    };

    return (
        <div className="w-full h-full flex justify-center items-center py-6" >
            <div className={`${cardClassName} ${className}`}>
                {withHeader && <div className={headerClassName}>{title}</div>}
                <div className={"px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 p-20"}>
                    {!withHeader &&
                        <h2 className="mb-10 text-center text-3xl font-extrabold">{title}</h2>}
                    {children}
                </div>
            </div>
        </div>
    );
};

CardComponent.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    withHeader: PropTypes.bool,
    className: PropTypes.string,
    backgroundImage: PropTypes.string, // Ajoutez cette ligne pour la nouvelle prop
};

CardComponent.defaultProps = {
    withHeader: false,
    className: '',
    backgroundImage: '', // Ajoutez cette ligne avec une valeur par défaut si nécessaire
};

export default CardComponent;
