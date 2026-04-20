interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className='mb-6 text-center'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-2'>{title}</h2>
      <p className='text-sm text-gray-500'>{subtitle}</p>
    </div>
  );
}

export default AuthHeader;
