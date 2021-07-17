import React from "react";
import _ from "lodash";

import { Card, Form } from "react-bootstrap";

import "../styles/components.scss";

function RateCard(props) {
  const { course, preferredHistorySubjects, setPreferredHistorySubjects } =
    props;

  const onRateRadioChange = (e) => {
    let newPreferredHistorySubjects = _.cloneDeep(preferredHistorySubjects);
    const subjectIndex = newPreferredHistorySubjects.findIndex(
      (item) => item.subject === course.subject
    );
    if (subjectIndex >= 0) {
      let newPreferredHistorySubject =
        newPreferredHistorySubjects[subjectIndex];
      newPreferredHistorySubject.rate += parseInt(e.currentTarget.value, 10);
    } else {
      newPreferredHistorySubjects.push({
        subject: course.subject,
        rate: parseInt(e.currentTarget.value, 10),
      });
    }
    setPreferredHistorySubjects(newPreferredHistorySubjects);
  };

  return (
    <Card className="rateCard">
      <div>{course.number}</div>
      <div>{course.name}</div>
      <div style={{ display: "flex" }}>
        <Form.Check
          style={{ marginRight: 4 }}
          type="radio"
          label="👍"
          value={2}
          name={course.number}
          onChange={(e) => onRateRadioChange(e)}
        />
        <Form.Check
          type="radio"
          label="👎"
          value={-2}
          name={course.number}
          onChange={(e) => onRateRadioChange(e)}
        />
      </div>
    </Card>
  );
}

export default RateCard;
