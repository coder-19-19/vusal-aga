const SkeletonLoader = ({width,height,marginTop,marginRight,float}) => {
    const styles = {
        width:width || 0,
        height:height,
        marginTop:marginTop || 0,
        marginRight:marginRight || 0,
        float:float || 'none'
    }
    return(
        <div style={styles} className="skeleton-loader"></div>
    )
}
export default SkeletonLoader
