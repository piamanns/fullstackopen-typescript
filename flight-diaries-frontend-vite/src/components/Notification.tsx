const Notification = ({ message }: { message: string | null }) => {
  if (!message) {
    return null;
  }

  const errorStyle = {
    color: 'red'
  };

  return (
    <div style={errorStyle}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
