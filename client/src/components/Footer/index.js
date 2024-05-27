import { FooterContainer, FooterContent, FooterText, FooterLink, FooterLinks } from "./styledComponents";

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterText>
                    &copy; {new Date().getFullYear()} Flower & Gift Delivery. All rights reserved.
                </FooterText>
                <FooterLinks>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Terms of Service</FooterLink>
                    <FooterLink href="#">Contact Us</FooterLink>
                </FooterLinks>
            </FooterContent>
        </FooterContainer>
    );
}

export default Footer