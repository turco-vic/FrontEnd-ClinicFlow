import { SignUp } from '@clerk/nextjs';
import styles from './cadastro.module.css';

export default function Cadastro() {
    return (
        <div className={styles.main}>
            <div className={styles.clerkContainer}>
                <SignUp 
                    routing="hash"
                    appearance={{
                        elements: {
                            rootBox: styles.clerkRoot,
                            card: styles.clerkCard,
                        }
                    }}
                />
            </div>
        </div>
    );
}
