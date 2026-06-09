interface props {
  title: string;
}

function AdminTitle({ title }: props) {
  return (
    <>
      <div
        className='rounded-sm my-4 p-4'
        style={{
          background: "linear-gradient(135deg, #6367FF 0%, #33369b 100%)",
        }}
      >
        <h5 className='text-white font-bold capitalize'>{title} </h5>
      </div>
    </>
  );
}

export default AdminTitle;
