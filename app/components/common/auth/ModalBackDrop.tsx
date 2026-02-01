type Props = {
  onClose: () => void;
};

export default function ModalBackdrop({ onClose }: Props) {
  return (
    <div
      className="absolute inset-0 bg-black/60"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}
