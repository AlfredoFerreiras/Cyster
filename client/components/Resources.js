import React from "react";

const Resources = () => {
  const resources = [
    {
      name: "Dr. Jane Doe",
      email: "jane.doe@example.com",
      specialization: "Clinical Psychologist",
      description:
        "Expert in cognitive behavioral therapy and has 10 years of experience in treating depression.",
      phone: null,
    },
    {
      name: "Depression Hotline",
      description:
        "24/7 support for anyone in distress, providing counseling and resources to manage depression.",
      phone: "1-800-123-4567",
      email: null,
    },
    // Add more resources as needed
  ];

  return (
    <div className="resources-page">
      <h1>Help Resources</h1>
      <p>
        If you or someone you know is struggling with depression, here are some
        professionals and hotlines you can reach out to:
      </p>

      <div className="resource-list">
        {resources.map((resource, index) => (
          <div className="resource-item" key={index}>
            <h2>{resource.name}</h2>
            {resource.specialization && (
              <p>
                <strong>Specialization:</strong> {resource.specialization}
              </p>
            )}
            <p>{resource.description}</p>
            {resource.email && (
              <a href={`mailto:${resource.email}`} className="email-button">
                Email {resource.name}
              </a>
            )}
            {resource.phone && (
              <p>
                <strong>Hotline:</strong>{" "}
                <a href={`tel:${resource.phone}`}>{resource.phone}</a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
