import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const TermsAndConditions: React.FC = () => {
    const terms = [
        "1. Aceptación de los Términos",
        "Al registrarte en la Plataforma, aceptas automáticamente estos términos y condiciones, así como nuestra política de privacidad.",
        "2. Uso del Servicio",
        "El servicio proporcionado está destinado a [descripción del servicio]. Está prohibido utilizar la Plataforma para actividades ilegales, difamatorias, abusivas, discriminatorias o que infrinjan los derechos de terceros.",
        "3. Registro y Cuentas",
        "Para utilizar algunos servicios de la Plataforma, es posible que se requiera registrarse y crear una cuenta. Te comprometes a proporcionar información veraz, actualizada y completa durante el proceso de registro y a mantener la confidencialidad de tu contraseña.",
        "4. Propiedad Intelectual",
        "Todo el contenido y material presente en la Plataforma, a excepción del generado por los usuarios, está protegido por derechos de propiedad intelectual. No se permite la reproducción, distribución o modificación del contenido sin autorización.",
        "5. Responsabilidades del Usuario",
        "El usuario se compromete a:",
        "- Utilizar la Plataforma de acuerdo con la ley y estos términos.",
        "- No publicar contenido ilegal, obsceno, difamatorio o que viole los derechos de terceros.",
        "- No intentar acceder a cuentas de otros usuarios o realizar actividades que puedan comprometer la seguridad de la Plataforma.",
        "6. Política de Privacidad",
        "Nuestra política de privacidad describe cómo recopilamos, usamos y compartimos tu información personal. Al utilizar la Plataforma, aceptas nuestras prácticas de privacidad.",
        "7. Comunicaciones Electrónicas",
        "Al registrarte en la Plataforma, aceptas recibir comunicaciones electrónicas de nuestra parte, como correos electrónicos informativos, actualizaciones o notificaciones.",
        "8. Limitación de Responsabilidad",
        "No nos responsabilizamos de posibles daños directos, indirectos, incidentales, especiales o consecuentes que puedan surgir del uso o la imposibilidad de utilizar la Plataforma.",
        "9. Modificaciones de los Términos",
        "Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones serán efectivas al ser publicadas en la Plataforma. Se recomienda revisar periódicamente los términos y condiciones.",
        "10. Cancelación y Suspensión",
        "Nos reservamos el derecho de cancelar, suspender o restringir tu acceso a la Plataforma si incumples estos términos o si consideramos que tu conducta puede ser perjudicial para otros usuarios o para nosotros.",
        "11. Enlaces a Terceros",
        "La Plataforma puede contener enlaces a sitios web de terceros. No nos responsabilizamos por el contenido o las prácticas de privacidad de estos sitios. El acceso a ellos es bajo tu propio riesgo.",
        "12. Indemnización",
        "Te comprometes a indemnizarnos y eximirnos de responsabilidad ante cualquier reclamo, pérdida, daño o gasto que surja de tu uso de la Plataforma o tu incumplimiento de estos términos.",
        "13. Ley Aplicable",
        "Estos términos se rigen por las leyes del [país o región] y cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de [ciudad, país].",
        "14. Divisibilidad",
        "Si alguna disposición de estos términos se considera inválida o no aplicable, dicha disposición se interpretará de manera coherente con la ley aplicable para reflejar lo más fielmente posible nuestras intenciones originales. El resto de los términos permanecerá en pleno vigor y efecto.",
        "15. Cesión",
        "No puedes ceder, transferir o sublicenciar ninguno de tus derechos u obligaciones bajo estos términos sin nuestro consentimiento previo por escrito.",
        "16. Encabezados",
        "Los encabezados de sección en estos términos se incluyen solo por conveniencia y no afectan la interpretación de ningún término.",
        "17. Consentimiento",
        "Al hacer clic en 'Registrarse' o 'Aceptar' (u otra acción similar) en la Plataforma, confirmas que has leído, comprendido y aceptado estos Términos y Condiciones.",
        "18. Actualizaciones de Términos",
        "Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento sin notificación previa. Se publicará la fecha de la última actualización al final de estos términos.",
        "19. Contacto",
        "Si tienes alguna pregunta o inquietud sobre estos términos, contáctanos en [correo electrónico de contacto].",
        "20. Agradecimiento",
        "Gracias por utilizar nuestra Plataforma."
      ];

      return (
        <Grid container justifyContent="center" marginBottom={3}>
            <Grid
                item
                xs={12}
                md={10}
                style={{
                    backgroundColor: '#7996d2',
                    borderRadius: '.4rem',
                    marginTop: '1rem'
                }}
                >
            <Typography sx={{ mt: 4, mb: 2, ml:2 }} variant="h6" component="div">
                Términos y Condiciones de Uso
            </Typography>
            <Grid
                style={{
                    backgroundColor: '#e0e7f5',
                }}
            >
                <List>
                    {terms.map((term, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={term} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
            </Grid>
        </Grid>
      );
    };
export default TermsAndConditions;
