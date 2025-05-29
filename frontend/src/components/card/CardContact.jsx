export default function ContactCard({ link, src, alt }) {
  return (
    <div className={`hover:drop-shadow-lg hover:scale-110 transition duration-250`}>
      <a
        href={link}
        target="_blank"
      >
        <img
          src={src}
          alt={alt}
          className="w-20 sm:w-32"
        />
      </a>
    </div>
  );
}