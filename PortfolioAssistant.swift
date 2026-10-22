import UIKit

class PortfolioAssistant: UIViewController {
    // MARK: - Properties
    private let scrollView = UIScrollView()
    private let messageStackView = UIStackView()
    private let inputField = UITextField()
    private let sendButton = UIButton()
    private var messages: [(role: String, content: String, timestamp: String)] = []

    // MARK: - Colors
    private let backgroundColor = UIColor(red: 0.98, green: 0.98, blue: 0.984, alpha: 1) // #FAFAFB
    private let textPrimary = UIColor(red: 0.102, green: 0.102, blue: 0.102, alpha: 1) // #1A1A1A
    private let textMuted = UIColor(red: 0.553, green: 0.553, blue: 0.553, alpha: 1) // #8D8D8D
    private let accentBlue = UIColor(red: 0.251, green: 0.376, blue: 0.784, alpha: 1) // #4060C8
    private let messageBg = UIColor.white
    private let border = UIColor(red: 0.102, green: 0.102, blue: 0.102, alpha: 0.08)

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        loadInitialMessage()
    }

    // MARK: - Setup
    private func setupUI() {
        view.backgroundColor = backgroundColor

        setupHeader()
        setupSubtitle()
        setupScrollView()
        setupInputArea()
    }

    private func setupHeader() {
        let headerView = UIView()
        headerView.backgroundColor = backgroundColor
        view.addSubview(headerView)
        headerView.translatesAutoresizingMaskIntoConstraints = false

        // Title
        let titleLabel = UILabel()
        titleLabel.text = "LAINEY"
        titleLabel.font = UIFont(name: "Manrope", size: 14) ?? UIFont.systemFont(ofSize: 14, weight: .medium)
        titleLabel.textColor = accentBlue
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        headerView.addSubview(titleLabel)

        // Status Pill
        let statusPill = createStatusPill()
        headerView.addSubview(statusPill)

        NSLayoutConstraint.activate([
            headerView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            headerView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            headerView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            headerView.heightAnchor.constraint(equalToConstant: 60),

            titleLabel.leadingAnchor.constraint(equalTo: headerView.leadingAnchor, constant: 40),
            titleLabel.centerYAnchor.constraint(equalTo: headerView.centerYAnchor),

            statusPill.trailingAnchor.constraint(equalTo: headerView.trailingAnchor, constant: -40),
            statusPill.centerYAnchor.constraint(equalTo: headerView.centerYAnchor),
        ])
    }

    private func createStatusPill() -> UIView {
        let pill = UIView()
        pill.backgroundColor = UIColor.white
        pill.layer.borderColor = border.cgColor
        pill.layer.borderWidth = 1
        pill.layer.cornerRadius = 15
        pill.translatesAutoresizingMaskIntoConstraints = false

        let dot = UIView()
        dot.backgroundColor = accentBlue
        dot.layer.cornerRadius = 4
        dot.translatesAutoresizingMaskIntoConstraints = false
        pill.addSubview(dot)

        let label = UILabel()
        label.text = "Online"
        label.font = UIFont(name: "Manrope", size: 12) ?? UIFont.systemFont(ofSize: 12, weight: .medium)
        label.textColor = textPrimary
        label.translatesAutoresizingMaskIntoConstraints = false
        pill.addSubview(label)

        NSLayoutConstraint.activate([
            pill.heightAnchor.constraint(equalToConstant: 30),
            pill.widthAnchor.constraint(greaterThanOrEqualToConstant: 70),

            dot.widthAnchor.constraint(equalToConstant: 8),
            dot.heightAnchor.constraint(equalToConstant: 8),
            dot.leadingAnchor.constraint(equalTo: pill.leadingAnchor, constant: 10),
            dot.centerYAnchor.constraint(equalTo: pill.centerYAnchor),

            label.leadingAnchor.constraint(equalTo: dot.trailingAnchor, constant: 6),
            label.centerYAnchor.constraint(equalTo: pill.centerYAnchor),
            label.trailingAnchor.constraint(equalTo: pill.trailingAnchor, constant: -10),
        ])

        return pill
    }

    private func setupSubtitle() {
        let containerView = UIView()
        containerView.backgroundColor = backgroundColor
        view.addSubview(containerView)
        containerView.translatesAutoresizingMaskIntoConstraints = false

        // Main subtitle
        let subtitleLabel = UILabel()
        subtitleLabel.text = "Ask about projects, design systems, or how I approach 0 to 1 product work."
        subtitleLabel.font = UIFont(name: "Manrope", size: 14) ?? UIFont.systemFont(ofSize: 14, weight: .regular)
        subtitleLabel.textColor = textMuted
        subtitleLabel.numberOfLines = 0
        subtitleLabel.translatesAutoresizingMaskIntoConstraints = false
        containerView.addSubview(subtitleLabel)

        // Secondary text
        let secondaryLabel = UILabel()
        secondaryLabel.text = "Responses are generated based on this portfolio."
        secondaryLabel.font = UIFont(name: "Manrope", size: 12) ?? UIFont.systemFont(ofSize: 12, weight: .medium)
        secondaryLabel.textColor = textMuted
        secondaryLabel.translatesAutoresizingMaskIntoConstraints = false
        containerView.addSubview(secondaryLabel)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 60),
            containerView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: view.trailingAnchor),

            subtitleLabel.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 8),
            subtitleLabel.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 40),
            subtitleLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -40),

            secondaryLabel.topAnchor.constraint(equalTo: subtitleLabel.bottomAnchor, constant: 8),
            secondaryLabel.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 40),
            secondaryLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -40),
            secondaryLabel.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -8),
        ])
    }

    private func setupScrollView() {
        scrollView.backgroundColor = backgroundColor
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(scrollView)

        messageStackView.axis = .vertical
        messageStackView.spacing = 16
        messageStackView.distribution = .equalSpacing
        messageStackView.translatesAutoresizingMaskIntoConstraints = false
        scrollView.addSubview(messageStackView)

        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 140),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -100),

            messageStackView.topAnchor.constraint(equalTo: scrollView.topAnchor, constant: 16),
            messageStackView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor, constant: 40),
            messageStackView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor, constant: -40),
            messageStackView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor, constant: -16),
            messageStackView.widthAnchor.constraint(equalTo: scrollView.widthAnchor, constant: -80),
        ])
    }

    private func setupInputArea() {
        let inputContainer = UIView()
        inputContainer.backgroundColor = backgroundColor
        inputContainer.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(inputContainer)

        // Input field background
        let inputBg = UIView()
        inputBg.backgroundColor = messageBg
        inputBg.layer.borderColor = border.cgColor
        inputBg.layer.borderWidth = 1
        inputBg.layer.cornerRadius = 22
        inputBg.translatesAutoresizingMaskIntoConstraints = false
        inputContainer.addSubview(inputBg)

        // Text field
        inputField.placeholder = "Ask me anything…"
        inputField.font = UIFont(name: "Manrope", size: 14) ?? UIFont.systemFont(ofSize: 14, weight: .regular)
        inputField.textColor = textPrimary
        inputField.translatesAutoresizingMaskIntoConstraints = false
        inputBg.addSubview(inputField)

        // Send button
        sendButton.backgroundColor = accentBlue
        sendButton.layer.cornerRadius = 20
        sendButton.setTitle("→", for: .normal)
        sendButton.setTitleColor(.white, for: .normal)
        sendButton.titleLabel?.font = UIFont.systemFont(ofSize: 16, weight: .medium)
        sendButton.translatesAutoresizingMaskIntoConstraints = false
        sendButton.addTarget(self, action: #selector(sendMessage), for: .touchUpInside)
        inputBg.addSubview(sendButton)

        NSLayoutConstraint.activate([
            inputContainer.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
            inputContainer.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            inputContainer.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            inputContainer.heightAnchor.constraint(equalToConstant: 80),

            inputBg.centerYAnchor.constraint(equalTo: inputContainer.centerYAnchor),
            inputBg.leadingAnchor.constraint(equalTo: inputContainer.leadingAnchor, constant: 40),
            inputBg.trailingAnchor.constraint(equalTo: inputContainer.trailingAnchor, constant: -40),
            inputBg.heightAnchor.constraint(equalToConstant: 56),

            inputField.leadingAnchor.constraint(equalTo: inputBg.leadingAnchor, constant: 16),
            inputField.centerYAnchor.constraint(equalTo: inputBg.centerYAnchor),
            inputField.trailingAnchor.constraint(equalTo: sendButton.leadingAnchor, constant: -12),

            sendButton.widthAnchor.constraint(equalToConstant: 40),
            sendButton.heightAnchor.constraint(equalToConstant: 40),
            sendButton.trailingAnchor.constraint(equalTo: inputBg.trailingAnchor, constant: -8),
            sendButton.centerYAnchor.constraint(equalTo: inputBg.centerYAnchor),
        ])
    }

    // MARK: - Messages
    private func loadInitialMessage() {
        addMessage(role: "assistant", content: "Hi — I can help with case studies, design decisions, or quick summaries of the work on this page.")
    }

    private func addMessage(role: String, content: String) {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        let timestamp = formatter.string(from: Date())

        messages.append((role: role, content: content, timestamp: timestamp))

        let messageBubble = createMessageBubble(content: content, timestamp: timestamp, isAssistant: role == "assistant")
        messageStackView.addArrangedSubview(messageBubble)

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            self.scrollView.scrollRectToVisible(CGRect(x: 0, y: self.scrollView.contentSize.height - 1, width: 1, height: 1), animated: true)
        }
    }

    private func createMessageBubble(content: String, timestamp: String, isAssistant: Bool) -> UIView {
        let container = UIView()
        container.translatesAutoresizingMaskIntoConstraints = false

        // Bubble
        let bubble = UIView()
        bubble.backgroundColor = messageBg
        bubble.layer.borderColor = border.cgColor
        bubble.layer.borderWidth = 1
        bubble.layer.cornerRadius = 22
        bubble.translatesAutoresizingMaskIntoConstraints = false
        container.addSubview(bubble)

        // Text
        let textLabel = UILabel()
        textLabel.text = content
        textLabel.font = UIFont(name: "Manrope", size: 14) ?? UIFont.systemFont(ofSize: 14, weight: .regular)
        textLabel.textColor = textPrimary
        textLabel.numberOfLines = 0
        textLabel.translatesAutoresizingMaskIntoConstraints = false
        bubble.addSubview(textLabel)

        // Timestamp
        let timeLabel = UILabel()
        timeLabel.text = timestamp
        timeLabel.font = UIFont(name: "Manrope", size: 12) ?? UIFont.systemFont(ofSize: 12, weight: .medium)
        timeLabel.textColor = textMuted
        timeLabel.translatesAutoresizingMaskIntoConstraints = false
        container.addSubview(timeLabel)

        NSLayoutConstraint.activate([
            bubble.topAnchor.constraint(equalTo: container.topAnchor),
            bubble.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            bubble.trailingAnchor.constraint(equalTo: container.trailingAnchor),

            textLabel.topAnchor.constraint(equalTo: bubble.topAnchor, constant: 14),
            textLabel.leadingAnchor.constraint(equalTo: bubble.leadingAnchor, constant: 16),
            textLabel.trailingAnchor.constraint(equalTo: bubble.trailingAnchor, constant: -16),
            textLabel.bottomAnchor.constraint(equalTo: bubble.bottomAnchor, constant: -14),

            timeLabel.topAnchor.constraint(equalTo: bubble.bottomAnchor, constant: 8),
            timeLabel.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            timeLabel.bottomAnchor.constraint(equalTo: container.bottomAnchor),
        ])

        return container
    }

    @objc private func sendMessage() {
        guard let text = inputField.text, !text.isEmpty else { return }

        addMessage(role: "user", content: text)
        inputField.text = ""

        // Simulate API response
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.addMessage(role: "assistant", content: "Thanks for your question! I'm processing your request based on my portfolio.")
        }
    }
}
