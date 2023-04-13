import styles from './LoadingIndicator.module.css'

const LoadingIndicator = ({ size }: { size?: number }) => {
  return (
    <div className={styles.spinner}>
      <div className={styles.bounce1} style={{ width: size, height: size }}></div>
      <div className={styles.bounce2} style={{ width: size, height: size }}></div>
      <div className={styles.bounce3} style={{ width: size, height: size }}></div>
    </div>
  )
}

export default LoadingIndicator
