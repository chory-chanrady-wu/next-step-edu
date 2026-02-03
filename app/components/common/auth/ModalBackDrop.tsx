type Props = {
  onClose: () => void;
};

export default function ModalBackdrop({ onClose }: Props) {
  return (
    <div
      className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}
