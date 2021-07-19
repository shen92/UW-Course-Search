import React from "react";
import PropTypes from "prop-types";
import { Card, Form } from "react-bootstrap";

import { RateCard } from "../components";

import "../styles/components.scss";

function Preferences(props) {
  const {
    subjects,
    keywords,
    historyCourses,
    preferredSubjects,
    setPreferredSubjects,
    preferredKeywords,
    setPreferredKeywords,
    preferredHistorySubjects,
    setPreferredHistorySubjects,
  } = props;

  const onSubjectChoiceBoxChange = (e) => {
    const targetSubject = e.currentTarget.value;
    let newPreferredSubjects = [...preferredSubjects];
    const subjectIndex = newPreferredSubjects.findIndex(
      (subject) => subject === targetSubject
    );
    if (e.currentTarget.checked) {
      if (subjectIndex < 0) {
        newPreferredSubjects.push(targetSubject);
      }
    } else {
      if (subjectIndex >= 0) {
        newPreferredSubjects.splice(subjectIndex, 1);
      }
    }
    setPreferredSubjects(newPreferredSubjects);
  };

  const onKeywordChoiceBoxChange = (e) => {
    const targetKeyword = e.currentTarget.value;
    let newPreferredKeywords = [...preferredKeywords];
    const keywordIndex = newPreferredKeywords.findIndex(
      (subject) => subject === targetKeyword
    );
    if (e.currentTarget.checked) {
      if (keywordIndex < 0) {
        newPreferredKeywords.push(targetKeyword);
      }
    } else {
      if (keywordIndex >= 0) {
        newPreferredKeywords.splice(keywordIndex, 1);
      }
    }
    setPreferredKeywords(newPreferredKeywords);
  };

  return (
    <Card className="sidebar">
      <Card.Title>Preferences</Card.Title>
      <Form>
        <Form.Group controlId="formSubject">
          <Form.Label>Ratings</Form.Label>
          {historyCourses.map((course) => (
            <RateCard
              key={course.number}
              course={course}
              preferredHistorySubjects={preferredHistorySubjects}
              setPreferredHistorySubjects={setPreferredHistorySubjects}
            />
          ))}
        </Form.Group>
        <Form.Group controlId="formSubject">
          <Form.Label>Subjects</Form.Label>
          {subjects.map((subject) => {
            return (
              subject !== "All" && (
                <Form.Check
                  type="checkbox"
                  key={subject}
                  label={subject}
                  value={subject}
                  onChange={(e) => onSubjectChoiceBoxChange(e)}
                />
              )
            );
          })}
        </Form.Group>
        <Form.Group controlId="formSubject">
          <Form.Label>Keywords</Form.Label>
          {keywords.map((keyword) => (
            <Form.Check
              style={{
                textTransform: "capitalize",
              }}
              type="checkbox"
              key={keyword}
              label={keyword}
              value={keyword}
              onChange={(e) => onKeywordChoiceBoxChange(e)}
            />
          ))}
        </Form.Group>
      </Form>
    </Card>
  );
}

Preferences.props = {
  subjects: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  historyCourses: PropTypes.array.isRequired,
  preferredSubjects: PropTypes.array.isRequired,
  setPreferredSubjects: PropTypes.func.isRequired,
  preferredKeywords: PropTypes.array.isRequired,
  setPreferredKeywords: PropTypes.func.isRequired,
  preferredHistorySubjects: PropTypes.array.isRequired,
  setPreferredHistorySubjects: PropTypes.func.isRequired,
};

export default Preferences;
