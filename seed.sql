INSERT INTO authors (name, email, bio) VALUES
(
    'Sofía Martínez',
    'sofia.martinez@example.com',
    'Desarrolladora frontend interesada en diseño y experiencia de usuario'
),
(
    'Diego Herrera',
    'diego.herrera@example.com',
    'Programador backend apasionado por bases de datos y APIs'
),
(
    'Valentina Cruz',
    'valentina.cruz@example.com',
    'Creadora de contenido sobre tecnología y productividad'
),
(
    'Mateo Sánchez',
    'mateo.sanchez@example.com',
    'Estudiante de programación enfocado en JavaScript'
),
(
    'Camila Torres',
    'camila.torres@example.com',
    'Ingeniera de software interesada en desarrollo web'
);

INSERT INTO posts (title, content, author_id, published) VALUES
(
    'Primeros pasos con Express',
    'Express permite construir APIs de manera sencilla utilizando Node.js.',
    1,
    TRUE
),
(
    'Cómo organizar un proyecto backend',
    'Una buena estructura de carpetas ayuda a mantener el código organizado y fácil de mantener.',
    2,
    TRUE
),
(
    'Por qué aprender SQL',
    'SQL es una herramienta fundamental para trabajar con bases de datos relacionales.',
    3,
    TRUE
),
(
    'Mi experiencia aprendiendo JavaScript',
    'Aprender JavaScript puede ser desafiante al principio, pero practicar constantemente ayuda mucho.',
    4,
    FALSE
),
(
    'Qué espero de mi primer proyecto backend',
    'Construir una API completa es una excelente manera de poner en práctica los conocimientos de programación.',
    5,
    FALSE
);