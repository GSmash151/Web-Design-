import React from "react";

const UpdateComp = OrigialComp => {
      class NewComp extends React.Component {
            render() {
                  return <OrigialComp name="The user" />
            }
      }
      return NewComp;
};
export default UpdateComp;