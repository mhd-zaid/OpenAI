import PropTypes from 'prop-types';
import { cardContentClasses } from '@mui/material';

const CardComponent = ({ title, children, variant, className, cardContentClass, boxShadow }) => {
    const headerClassName = "relative top-0 bg-gray-800 text-white w-full py-8 sm:py-2 md:py-2 lg:py-4 xl:py-4 p-5 rounded-t-2xl mb-16";
    const shadowClassName = "card__shadow border-radius-5 p-20 mb-20 relative line-height-1.5";

    const renderHeader = () => {
        if (variant === 'withHeader') {
            return <div className={headerClassName}>{title}</div>;
        } else if (variant !== 'withShadow'){
            return <h2 className="mb-10 text-center text-3xl font-extrabold hover:break-before-column">{title}</h2>;
        }
    };

    const shadowStyle = {
        '--box-shadow-color': boxShadow?.color,
        boxShadow: `0 0 0 2px var(--box-shadow-color), ${
          boxShadow?.position === 'bottomRight' ? '10px 10px' :
            boxShadow?.position === 'bottomLeft' ? '-10px 10px' :
              boxShadow?.position === 'topRight' ? '10px -10px' :
                boxShadow?.position === 'topLeft' ? '-10px -10px' :
          '10px 10px'
        } 0 var(--box-shadow-color)`
    };

    return (
      // <div className="w-full h-full flex justify-center items-center py-6" >
      <div className={`${cardContentClass} flex justify-center items-center`}>
          <div className={` ${className} ${variant === 'withShadow' ? shadowClassName : ''} ${variant === 'withShadow' ? 'shadow-bottomLeft' : ''}`} style={variant === 'withShadow' ? shadowStyle : null}>
              {renderHeader()}
              <div className={""}>
                  {children}
              </div>
          </div>
      </div>
    );
};

CardComponent.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['withHeader', 'default', 'withShadow']),
    className: PropTypes.string,
    cardContentClass: PropTypes.string,
    backgroundImage: PropTypes.string,
    boxShadow: PropTypes.shape({
        position: PropTypes.oneOf(['bottomRight', 'bottomLeft', 'topRight', 'topLeft']),
        color: PropTypes.string,
    }),
};

CardComponent.defaultProps = {
    variant: 'default',
    className: '',
    boxShadowColor: '#eab308',
    backgroundImage: '',
};


export default CardComponent;
