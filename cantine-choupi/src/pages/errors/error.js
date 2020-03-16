import React from 'react';
import "./error_styles.scss";
import { Link } from 'react-router-dom';

const ErrorPage = (props) => {
  let code;
  let title;
  let desc;

  if (props.code) {
    switch (props.code) {
      case "404":
        code = "404";
        title = "Pagina niet gevonden";
        desc = "De pagina die je wilt bezoeken is niet gevonden. Deze pagina kan verplaatst of tijdelijk niet beschikbaar zijn.";
      break;
      case "401":
        code = "401";
        title = "Niet toegestaan";
        desc = "De pagina die je wilt bezoeken is beveiligd en je bent niet toegestaan om deze te bezoeken.";
      break;
      default:
        code = "???";
        title = "Niet gevonden foutmelding";
        desc = "Geen idee wat er mis ging. Er is een bericht gestuurd naar de admins.";
      break;
    };
  } else {
    code = "???";
    title = "Niet gevonden foutmelding";
    desc = "Geen idee wat er mis ging. Er is een bericht gestuurd naar de admins.";
  };

  return (
    <div className="notfound__wrapper">
      <div className="notfound">
        <div className="notfound__code">
          <h1 className="notfound__code-title">Oops! :(</h1>
        </div>
        <h2 className="notfound__code-subtitle">{ `${code} - ${title}` }</h2>
        <p className="notfound__code-description">{ desc }</p>
        {
          props.code === "404" ? (
            <Link className="notfound__button" to="/">Op naar huis!</Link>
          ) : props.code === "401" ? (
            <span className="notfound__button" onClick={ () => { window.location.reload() } }>Opnieuw proberen?</span>
          ) : (
            <Link className="notfound__button" to="/">Op naar huis!</Link>
          )
        }
      </div>
    </div>
  );
};

export default ErrorPage;
