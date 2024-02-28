const GaleriaCard = ({ img, desc }) => {
	return (
		<div className="w-full h-[300px]">
			<img src={img} alt={desc} />
		</div>
	)
}

export default GaleriaCard
