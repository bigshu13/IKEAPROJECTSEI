import React, { useEffect } from 'react';
import styles from './PexelsContent.module.scss';

function PexelsContent({ pexelsData, setPexelsData }) {
	useEffect(() => {
		fetch('http://localhost:8011/pexels')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setPexelsData(data);
			})
			.catch((error) => {
				console.error('Error fetching Pexels data:', error);
			});
	}, []);

	return (
		<div>
			{pexelsData.length === 0 ? (
				<p>Loading...</p>
			) : (
				pexelsData.map((item) => (
					<div key={item.id}>
						<section className={styles.videoSection}>
							{item.duration && (
								<video controls autoPlay loop className={styles.video}>
									<source src={item.video_files[0].link} type="video/mp4" />{' '}
									Your browser does not support the video tag.
								</video>
							)}
						</section>
						{/* text or other components here */}
					</div>
				))
			)}
		</div>
	);
}

export default PexelsContent;
