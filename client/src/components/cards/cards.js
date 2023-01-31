import Styles from "./cards.module.css";
import { connect } from "react-redux";
import Card from "../card/card";

const Cards = ({ paginate }) => {
  return (
    // renderizo todas las cartas dependiendo el paginado
    <>
      <div className={Styles.div_container}>
        {paginate?.map(({ name, flag, continent, id }, i) => (
          <Card name={name} flag={flag} continent={continent} id={id} key={i} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    paginate: state.paginate,
  };
};

export default connect(mapStateToProps, null)(Cards);
