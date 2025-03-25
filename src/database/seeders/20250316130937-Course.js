'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const courses = [
      { 
        title: "Ruby on Rails", 
        description: "Ruby on Rails is a server-side web application framework written in Ruby under the MIT License. It is a model–view–controller framework, providing default structures for a database, a web service, and web pages.", 
        skills: ["Ruby", "Ruby on Rails", "HTML", "CSS", "JavaScript"],
        duration: 90
      },
      {
        title: "Machine Learning",
        description: "Machine learning is the study of computer algorithms that improve automatically through experience and by the use of data.",
        skills: ["R", "Jupyter/Colab", "scikit-learn", "Keras", "Pandas", "NumPy", "Tensorflow", "PyTorch", "Statistics", "Matplotlib", "Seaborn", "ggplot", "D3.js", "SQL", "Flask"],
        duration: 120
      },
      {
        title: ".NET",
        description: ".NET is a free, cross-platform, open-source developer platform for building many different types of applications.",
        skills: ["C#", "ASP.Net core MVC", "ASP.Net Web API", "Entity Framework core", "SQL", "HTML", "CSS", "JavaScript"],
        duration: 90
      },
      {
        title: "Angular",
        description: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript.",
        skills: ["Angular", "TypeScript", "HTML", "CSS", "JavaScript"],
        duration: 90
      },
      {
        title: "SQL",
        description: "SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS), or for stream processing in a relational data stream management system (RDSMS).",
        skills: ["ER Diagrams", "SQL Server", "MySQL", "Postgres", "MongoDB", "Redis", "Elasticsearch"],
        duration: 60
      },
      {
        title: "Data Science",
        description: "Data science is an inter-disciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.",
        skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ggplot", "D3.js", "scikit-learn", "Keras", "Tensorflow", "PyTorch", "Statistics", "SQL", "Flask"],
        duration: 60
      },
      {
        title: "Java",
        description: "Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
        skills: ["Java", "Spring boot", "Spring MVC", "Spring Security", "Hibernate", "JDBC", "JSP", "Servlets", "JPA", "Junit", "Mockito", "Maven", "STS", "Tomcat", "MySQL", "Postgres", "MongoDB", "Redis", "Elasticsearch", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "Git", "HTML", "CSS", "JavaScript", "React JS", "Angular", "VueJS", "Nodejs", "ExpressJS", "TypeScript", "Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "ggplot", "D3.js", "scikit-learn", "Keras", "Tensorflow", "PyTorch", "Statistics", "SQL", "Flask"],
        duration: 90
      }
    ];
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Insert course and attach skills
      const courseRecords = await queryInterface.bulkInsert(
        'Courses',
        courses.map(course => ({
          title: course.title,
          description: course.description,
          duration: course.duration,
          createdAt: new Date(),
          updatedAt: new Date()
        })),
        { returning: true, transaction }
      );

      const skillNames = [...new Set(courses.flatMap(course => course.skills))];
      const existingSkills = await queryInterface.sequelize.query(
        `SELECT id, title FROM "Skills" WHERE "title" IN (:skillNames)`,
        { replacements: { skillNames }, type: Sequelize.QueryTypes.SELECT, transaction }
      );
      const existingSkillMap = new Map(existingSkills.map(skill => [skill.title, skill.id]));
      const newSkills = skillNames.filter(skill => !existingSkillMap.has(skill));      
      if (newSkills.length > 0) {
        const newSkillRecords = await queryInterface.bulkInsert(
          'Skills',
          newSkills.map(skill => ({
            title: skill,
            createdAt: new Date(),
            updatedAt: new Date()
          })),
          { returning: true, transaction }
        );

        newSkillRecords.forEach((skill) => existingSkillMap.set(skill.title, skill.id));        
      }


      // Insert course-skill associations
      const courseSkillMappings = [];
      courseRecords.forEach((course, index) => {
        courses[index].skills.forEach(skillName => {
          courseSkillMappings.push({
            courseId: course.id,
            skillId: existingSkillMap.get(skillName),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      });

      await queryInterface.bulkInsert('CourseSkills', courseSkillMappings, { transaction });
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('CourseSkills', null, { transaction });
      await queryInterface.bulkDelete('Skills', null, { transaction });
      await queryInterface.bulkDelete('Courses', null, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
